from django.conf.urls import include, url
from django.contrib import admin
from registration.backends.default.views import RegistrationView
from registration.forms import RegistrationFormUniqueEmail
from postcard.views import *
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
    url(r'^search/$', 'postcard.views.search'),
    url(r'^profile$', 'postcard.views.profile', name='profile'),
    #url(r'^firstTemplate$',edit.as_view(),name='edit'),
    url(r'^savePostCard$', 'postcard.views.save_post_card'),
    url(r'^getListOfPicture/(?P<num>[0-9]+)/$', 'postcard.views.getlist'),
    url(r'^getListOfPicture/templates/$', 'postcard.views.getlist'),
    url(r'^postcard/(?P<id>[0-9]+)/$', 'postcard.views.showPostCard'),
    url(r'^save$', 'postcard.views.save'),
    url(r'^edit/(?P<id>[0-9]+)/$', 'postcard.views.edit'),
    url(r'^createnew/(?P<templnum>\w+)/$', 'postcard.views.edit'),
    url(r'^rate$', 'postcard.views.rate'),
    url(r'^checkBadges$', 'postcard.views.checkbudges'),
    url(r'^tags/(?P<tag>\w+)/$', 'postcard.views.tag_view'),
    url(r'^userRating$', 'postcard.views.user_rating'),
    url(r'getUserInfo$','postcard.views.get_user_info'),
    url(r'^update/(?P<field>\w+)/$', 'postcard.views.update_user_profile'),

]
