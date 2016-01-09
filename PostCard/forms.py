from django import forms
from postcard.models import UserInfo
from haystack.forms import SearchForm


class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserInfo
        fields = ('description', 'e_mail', 'telephone', 'first_name', 'last_name')