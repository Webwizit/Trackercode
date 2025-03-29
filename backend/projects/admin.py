from django.contrib import admin
from .models import Project

class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'billable', 'start_date', 'end_date', 'time_estimate', 'budget_estimate', 'created_at')
    list_filter = ('billable', 'start_date', 'end_date')
    search_fields = ('name', 'notes')
    ordering = ('-created_at',)

    # Ensuring clean() validation runs in the admin panel
    def save_model(self, request, obj, form, change):
        obj.full_clean()
        super().save_model(request, obj, form, change)

admin.site.register(Project, ProjectAdmin)
from django.contrib import admin
from .models import Member

@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "project")
    search_fields = ("name", "role", "project__name")
    list_filter = ("role", "project")
    ordering = ("name",)
