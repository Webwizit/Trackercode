# shifts/views.py

from rest_framework import generics, permissions, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from .models import Shift
from .serializers import ShiftSerializer

class ShiftListCreateAPIView(generics.ListCreateAPIView):
    """
    GET  /api/shifts/    → list all shifts created by this user
    POST /api/shifts/    → create a new shift (authenticated users only)
    """
    serializer_class = ShiftSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Shift.objects.filter(created_by=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            # Explicitly log serializer errors to console
            print("Shift creation validation errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save(created_by=request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ShiftRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    """
    GET /api/shifts/<int:pk>/   → retrieve a single shift
    PUT /api/shifts/<int:pk>/   → update a shift (only if created_by == request.user)
    """
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer
    permission_classes = [permissions.IsAuthenticated]

    def check_object_permissions(self, request, obj):
        if obj.created_by != request.user:
            raise PermissionDenied("You do not have permission to modify this shift.")
        return super().check_object_permissions(request, obj)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if not serializer.is_valid():
            print(f"Shift update validation errors (id={instance.id}):", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        self.perform_update(serializer)
        return Response(serializer.data)
