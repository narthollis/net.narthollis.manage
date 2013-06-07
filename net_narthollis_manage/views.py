from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.generic.detail import SingleObjectMixin
from django.views.generic import UpdateView
from django.utils.decorators import method_decorator
from django.forms import ModelForm

from django.views.generic import TemplateView


class IndexView(TemplateView):
    template_name = 'base.html'


class UserProfileForm(ModelForm):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')


class UserObjectMixin(SingleObjectMixin):
    """
    Provides views with the current user's profile.
    """
    model = User
    form_class = UserProfileForm

    success_url = '/accounts/profile/'

    def get_object(self):
        return self.request.user

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        """Ensures that only authenticated users can access the view."""
        klass = UserObjectMixin
        return super(klass, self).dispatch(request, *args, **kwargs)


class ProfileUpdateView(UserObjectMixin, UpdateView):
    """
    A view that displays a form for editing a user's profile.

    Uses a form dynamically created for the `Profile` model and
    the default model's update template.
    """
    template_name = 'registration/profile.html'
