// Image mapping for services
const SERVICE_IMAGE_MAP = {
  // Primary service mappings
  'plumbing': '/images/plumbing.jpeg',
  'electrical': '/images/electrician.jpeg',
  'carpentry': '/images/carpenter.jpeg',
  'painting': '/images/painting.jpeg',
  'cleaning': '/images/cleaning.jpeg',
  'mechanics': '/images/mechanic.jpeg',
  'mechanic': '/images/mechanic.jpeg',
  'pest control': '/images/pesting.jpeg',
  'pesting': '/images/pesting.jpeg',
  'gardening': '/images/gardener.jpeg',
  'garden': '/images/gardener.jpeg',
  'appliance repair': '/images/appliance-repair.jpeg',
  'appliance': '/images/appliance-repair.jpeg',
  
  // Alternative spellings and variations
  'plumber': '/images/plumbing.jpeg',
  'electrician': '/images/electrician.jpeg',
  'carpenter': '/images/carpenter.jpeg',
  'painter': '/images/painting.jpeg',
  'cleaner': '/images/cleaning.jpeg',
  'pest': '/images/pesting.jpeg',
  'repair': '/images/appliance-repair.jpeg'
};

// Function to get image path based on service name
export const getServiceImagePath = (serviceName, index = 0) => {
  if (!serviceName) return `/images/plumbing.jpeg`; // default fallback
  
  const normalizedService = serviceName.toLowerCase().trim();
  
  // Try exact match first
  for (const [key, imagePath] of Object.entries(SERVICE_IMAGE_MAP)) {
    if (normalizedService.includes(key)) {
      return imagePath;
    }
  }
  
  // Try partial matches
  for (const [key, imagePath] of Object.entries(SERVICE_IMAGE_MAP)) {
    if (normalizedService.indexOf(key) !== -1) {
      return imagePath;
    }
  }
  
  // If no match found, use generic mapping based on index
  const imageKeys = Object.keys(SERVICE_IMAGE_MAP);
  if (imageKeys.length === 0) return `/images/plumbing.jpeg`; // extra safety fallback
  const key = imageKeys[index % imageKeys.length];
  return SERVICE_IMAGE_MAP[key];
};

export default SERVICE_IMAGE_MAP;