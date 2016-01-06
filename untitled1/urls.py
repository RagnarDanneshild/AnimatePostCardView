from django.conf.urls import include, url
from django.contrib import admin
from registration.backends.default.views import RegistrationView
from registration.forms import RegistrationFormUniqueEmail
from PostCard.views import *
class RegistrationViewUniqueEmail(RegistrationView):
 form_class = RegistrationFormUniqueEmail


urlpatterns = [
    url(r'^$', Home.as_view(), name='home'),
    url(r'^admin/', include(admin.site.urls)),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url(r'^logout$',
        'django.contrib.auth.views.logout',
        {
            'next_page': '/',
        },
        name='logout'),
    url(r'^accounts/register$', RegistrationViewUniqueEmail.as_view(),name='registration_register'),
    url(r'^accounts/', include('registration.backends.default.urls')),
    url(r'^profile$','PostCard.views.profile', name='profile'),
    #url(r'^firstTemplate$',edit.as_view(),name='edit'),
    url(r'^savePostCard$','PostCard.views.save_post_card'),
    url(r'^getListOfPicture/(?P<num>[0-9]+)/$','PostCard.views.getlist'),
    url(r'^getListOfPicture/templates/$','PostCard.views.getlist'),
    url(r'^postcard/(?P<id>[0-9]+)/$','PostCard.views.showPostCard'),
    url(r'^save$','PostCard.views.save'),
    url(r'^edit/(?P<id>[0-9]+)/$','PostCard.views.edit'),
    url(r'^createnew/(?P<templnum>\w+)/$','PostCard.views.edit'),
    url(r'^rate$','PostCard.views.rate'),
    url(r'^checkBadges$','PostCard.views.checkbudges'),
    url(r'^tags/(?P<tag>\w+)/$','PostCard.views.tag_view'),
    url(r'^userRating$','PostCard.views.user_rating')

]
