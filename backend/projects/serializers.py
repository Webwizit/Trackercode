from rest_framework import serializers
from .models import Project, Member, Property

class PropertySerializer(serializers.ModelSerializer):
    screenshot = serializers.ImageField(required=False)

    class Meta:
        model = Property
        fields = '__all__'

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    members = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Member.objects.all(), required=False
    )  # Correctly handle ManyToManyField
    properties = PropertySerializer(many=True, required=False)  # Keep properties optional

    class Meta:
        model = Project
        fields = '__all__'

    def create(self, validated_data):
        members_data = validated_data.pop('members', [])  # List of IDs
        properties_data = validated_data.pop('properties', [])  # List of dicts
        project = Project.objects.create(**validated_data)

        # ✅ Correctly assign members to the project
        project.members.set(members_data)

        # ✅ Correctly create properties related to the project
        for prop in properties_data:
            screenshot = prop.pop("screenshot", None)
            property_instance = Property.objects.create(project=project, **prop)
            if screenshot:
                property_instance.screenshot = screenshot
                property_instance.save()

        return project

    def to_representation(self, instance):
        """Customize response to return member names instead of IDs."""
        ret = super().to_representation(instance)
        ret['members'] = [member.name for member in instance.members.all()]  # Convert IDs to names
        return ret
    
