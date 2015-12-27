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
    url(r'^edit$',edit.as_view(),name='edit')

]
