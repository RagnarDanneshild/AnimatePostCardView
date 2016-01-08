import datetime
from haystack import indexes
from postcard.models import PostCard,Template
from tagging.models import Tag
from django.contrib.auth.models import User


class TemplateIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    name = indexes.CharField(model_attr='name')

    def get_model(self):
        return Template
