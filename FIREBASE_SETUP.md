# Firebase Setup Instructions

This project uses Firebase for authentication, Firestore database, and Firebase Storage.

## Required Firebase Configuration

Add these environment variables from your Firebase project config:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## Firebase Authentication

Enable Email/Password authentication in the Firebase Console:
1. Go to Authentication > Sign-in method
2. Enable Email/Password provider

## Firestore Security Rules

Apply these security rules in your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - stores core user data
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId;
    }
    
    // Manufacturer profiles
    match /manufacturerProfiles/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId;
    }
    
    // Brand profiles
    match /brandProfiles/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId;
    }
    
    // Influencer profiles
    match /influencerProfiles/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId;
    }
    
    // Products - manufacturer can manage their own products
    match /products/{productId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && 
                      request.resource.data.manufacturerId == request.auth.uid;
      allow update, delete: if request.auth != null && 
                               resource.data.manufacturerId == request.auth.uid;
    }
    
    // RFQs - brands can create, manufacturers can read and update status
    match /rfqs/{rfqId} {
      allow read: if request.auth != null && 
                    (resource.data.brandId == request.auth.uid || 
                     resource.data.manufacturerId == request.auth.uid);
      allow create: if request.auth != null && 
                      request.resource.data.brandId == request.auth.uid;
      allow update: if request.auth != null && 
                      (resource.data.brandId == request.auth.uid || 
                       resource.data.manufacturerId == request.auth.uid);
    }
    
    // RFQ Responses - manufacturers can manage their own responses
    match /rfqResponses/{rfqId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && 
                      request.resource.data.manufacturerId == request.auth.uid;
      allow update: if request.auth != null && 
                      resource.data.manufacturerId == request.auth.uid;
    }
  }
}
```

## Firebase Storage Rules

Apply these security rules in Firebase Storage:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Product images - public read, authenticated write
    match /product-images/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Documents - private to owner
    match /documents/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // RFQ attachments - brand can write, manufacturer can read
    match /rfq-attachments/{brandId}/{rfqId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == brandId;
    }
  }
}
```

## Firestore Indexes

If you encounter index errors, create composite indexes for:

1. `products` collection: `manufacturerId` (ASC) + `createdAt` (DESC)
2. `rfqs` collection: `manufacturerId` (ASC) + `createdAt` (DESC)
3. `rfqs` collection: `brandId` (ASC) + `createdAt` (DESC)
4. `manufacturerProfiles` collection: `companyName` (ASC)

These can be created via the Firebase Console or by clicking the link in the error message.

## Data Structure

### users/{userId}
```json
{
  "email": "user@example.com",
  "role": "manufacturer" | "brand" | "influencer" | null,
  "profileCompleted": false,
  "createdAt": Timestamp
}
```

### manufacturerProfiles/{userId}
```json
{
  "userId": "string",
  "companyName": "string",
  "categories": ["Skincare", "Haircare"],
  "certifications": ["ISO 22716", "GMP"],
  "moq": "1000 units",
  "leadTime": "4-6 weeks",
  "description": "string",
  "location": "Los Angeles, CA",
  "website": "https://example.com",
  "createdAt": Timestamp,
  "updatedAt": Timestamp
}
```

### brandProfiles/{userId}
```json
{
  "userId": "string",
  "brandName": "string",
  "industry": "string",
  "createdAt": Timestamp,
  "updatedAt": Timestamp
}
```

### influencerProfiles/{userId}
```json
{
  "userId": "string",
  "name": "string",
  "primaryPlatform": "string",
  "createdAt": Timestamp,
  "updatedAt": Timestamp
}
```

### products/{productId}
```json
{
  "manufacturerId": "userId",
  "name": "Product Name",
  "category": "Skincare",
  "description": "string",
  "moq": "500 units",
  "leadTime": "4-6 weeks",
  "priceRange": "$5-10/unit",
  "images": ["url1", "url2"],
  "documents": ["url1"],
  "createdAt": Timestamp,
  "updatedAt": Timestamp
}
```

### rfqs/{rfqId}
```json
{
  "brandId": "userId",
  "manufacturerId": "userId",
  "title": "Request Title",
  "description": "string",
  "category": "Skincare",
  "quantity": "5000 units",
  "budget": "$50,000",
  "deadline": "2024-06-01",
  "status": "pending" | "in_review" | "accepted" | "rejected" | "completed",
  "createdAt": Timestamp,
  "updatedAt": Timestamp
}
```

### rfqResponses/{rfqId}
```json
{
  "rfqId": "string",
  "manufacturerId": "userId",
  "quotedPrice": "$8/unit",
  "estimatedLeadTime": "4-6 weeks",
  "message": "Detailed response message...",
  "status": "draft" | "submitted",
  "createdAt": Timestamp,
  "updatedAt": Timestamp
}
```

## Storage Structure

- `product-images/{userId}/{folder}/{filename}` - Product marketing images (public read)
- `documents/{userId}/{folder}/{filename}` - Private documents like certifications and formulations
- `rfq-attachments/{brandId}/{rfqId}/{filename}` - RFQ file attachments (brand writes, manufacturer reads)
