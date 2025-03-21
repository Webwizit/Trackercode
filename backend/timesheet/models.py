from django.db import models

class TimeEntry(models.Model):
    date = models.DateField()
    project = models.CharField(max_length=100)
    task = models.CharField(max_length=100)
    start_time = models.TimeField()
    end_time = models.TimeField()
    activity_description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.date} - {self.project} - {self.task}"
