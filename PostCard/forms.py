from django import forms
from PostCard.models import UserInfo

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserInfo
        fields = ('description', 'e_mail', 'telephone','first_name','last_name')


