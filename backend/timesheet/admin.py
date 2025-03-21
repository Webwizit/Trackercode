from django.contrib import admin
from .models import TimeEntry

@admin.register(TimeEntry)
class TimeEntryAdmin(admin.ModelAdmin):
    list_display = ('id', 'date', 'project', 'task', 'start_time', 'end_time', 'created_at')
    search_fields = ('project', 'task', 'activity_description')
    list_filter = ('date',)
