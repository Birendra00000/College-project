from rest_framework.routers import DefaultRouter
from ..viewsets.activities_viewsets import activitiesViewsets
from ..viewsets.destinations_viewsets import destinationsViewsets
from ..viewsets.packages_viewsets import packagesViewsets

router = DefaultRouter()
auto_api_routers = router


router.register('activities', activitiesViewsets, basename="activitiesViewsets")
router.register('packages', packagesViewsets, basename="packagesViewsets")
router.register('destinations', destinationsViewsets, basename="destinationsViewsets")
