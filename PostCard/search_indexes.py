import datetime
from haystack import indexes
from postcard.models import PostCard,Template
from tagging.models import Tag
from django.contrib.auth.models import User
from tagging.utils import parse_tag_input



class PostCardIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    author = indexes.CharField(model_attr='user')
    name = indexes.CharField(model_attr='name')
    postcardid = indexes.CharField(model_attr='id')
    postcardpicurl = indexes.CharField(model_attr='picture_url')

    def get_model(self):
        return PostCard

    def prepare(self, object):
        self.prepared_data = super(PostCardIndex, self).prepare(object)
        self.prepared_data['tags'] = [parse_tag_input(object.tags)]
        return self.prepared_data