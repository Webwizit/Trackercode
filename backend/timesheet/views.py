from rest_framework import generics
from .models import TimeEntry
from .serializers import TimeEntrySerializer

class TimeEntryListCreateView(generics.ListCreateAPIView):
    queryset = TimeEntry.objects.all().order_by("-created_at")
    serializer_class = TimeEntrySerializer
