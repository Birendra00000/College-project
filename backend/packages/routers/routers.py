from rest_framework.routers import DefaultRouter
from ..viewsets.activities_viewsets import activitiesViewsets
from ..viewsets.customuser_viewsets import customuserViewsets
from ..viewsets.review_viewsets import reviewViewsets
from ..viewsets.booking_viewsets import bookingViewsets
from ..viewsets.bookmark_viewsets import bookmarkViewsets
from ..viewsets.destinations_viewsets import destinationsViewsets
from ..viewsets.packages_viewsets import packagesViewsets

router = DefaultRouter()
auto_api_routers = router


router.register('activities', activitiesViewsets, basename="activitiesViewsets")
router.register('packages', packagesViewsets, basename="packagesViewsets")
router.register('destinations', destinationsViewsets, basename="destinationsViewsets")
router.register('bookmark', bookmarkViewsets, basename="bookmarkViewsets")
router.register('booking', bookingViewsets, basename="bookingViewsets")
router.register('review', reviewViewsets, basename="reviewViewsets")
router.register('customuser', customuserViewsets, basename="customuserViewsets")
