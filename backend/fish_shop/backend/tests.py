from django.test import TestCase

# Create your tests here.
from rest_framework.test import APITestCase

class FishApiTests(APITestCase):
    def test_get_fish(self):
        response = self.client.get('/backend/getGalaxyFish/')
        self.assertEqual(response.status_code, 200)