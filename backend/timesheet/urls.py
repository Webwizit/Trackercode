from django.urls import path
from .views import TimeEntryListCreateView

urlpatterns = [
    path('addtime/', TimeEntryListCreateView.as_view(), name='addtime-create'),
]
