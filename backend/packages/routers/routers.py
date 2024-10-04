from rest_framework.routers import DefaultRouter
from ..viewsets.activities_viewsets import activitiesViewsets
from ..viewsets.bookmark_viewsets import bookmarkViewsets
from ..viewsets.login_viewsets import loginViewsets
from ..viewsets.user_viewsets import userViewsets
from ..viewsets.destinations_viewsets import destinationsViewsets
from ..viewsets.packages_viewsets import packagesViewsets

router = DefaultRouter()
auto_api_routers = router


router.register('activities', activitiesViewsets, basename="activitiesViewsets")
router.register('packages', packagesViewsets, basename="packagesViewsets")
router.register('destinations', destinationsViewsets, basename="destinationsViewsets")
router.register('user', userViewsets, basename="userViewsets")
router.register('login', loginViewsets, basename="loginViewsets")
router.register('bookmark', bookmarkViewsets, basename="bookmarkViewsets")
