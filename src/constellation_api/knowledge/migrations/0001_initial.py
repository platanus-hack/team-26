# Generated by Django 5.1.3 on 2024-11-24 02:03

import django.db.models.deletion
import jsonfield.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Experiment',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('results', models.TextField()),
                ('cluster', models.IntegerField()),
                ('embedding', jsonfield.fields.JSONField()),
                ('is_representative', models.BooleanField(default=False)),
                ('centroid_embedding', jsonfield.fields.JSONField(blank=True, null=True)),
                ('category', models.CharField(blank=True, max_length=50, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='KnowledgeGraphEdge',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('source', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='outgoing_edges', to='knowledge.experiment')),
                ('target', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='incoming_edges', to='knowledge.experiment')),
            ],
            options={
                'unique_together': {('source', 'target')},
            },
        ),
    ]