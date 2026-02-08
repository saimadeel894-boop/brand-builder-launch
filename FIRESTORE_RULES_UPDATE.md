# Firestore Security Rules - UPDATED

**IMPORTANT**: Your client must copy and paste these rules into the Firebase Console:
1. Go to Firebase Console → Firestore Database → Rules
2. Replace ALL existing rules with the content below
3. Click "Publish"

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection - each user can read/write their own document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Manufacturer profiles - public read for discovery, owner can write
    match /manufacturerProfiles/{profileId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == profileId;
      allow update: if request.auth != null && request.auth.uid == profileId;
    }
    
    // Brand profiles - public read (so manufacturers can see brand names), owner can write
    match /brandProfiles/{profileId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == profileId;
      allow update: if request.auth != null && request.auth.uid == profileId;
    }
    
    // Influencer profiles - owner only
    match /influencerProfiles/{profileId} {
      allow read: if request.auth != null && request.auth.uid == profileId;
      allow create: if request.auth != null && request.auth.uid == profileId;
      allow update: if request.auth != null && request.auth.uid == profileId;
    }
    
    // Products - public read for browsing, manufacturer can manage their own
    match /products/{productId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && 
                      request.resource.data.manufacturerId == request.auth.uid;
      allow update, delete: if request.auth != null && 
                               resource.data.manufacturerId == request.auth.uid;
    }
    
    // RFQs - CRITICAL: Both brand AND manufacturer must be able to read/write
    match /rfqs/{rfqId} {
      // Allow read if user is the brand OR the manufacturer
      allow read: if request.auth != null && 
                    (resource.data.brandId == request.auth.uid || 
                     resource.data.manufacturerId == request.auth.uid);
      
      // Allow create if user is setting themselves as the brand
      allow create: if request.auth != null && 
                      request.resource.data.brandId == request.auth.uid;
      
      // Allow update if user is the brand OR the manufacturer
      allow update: if request.auth != null && 
                      (resource.data.brandId == request.auth.uid || 
                       resource.data.manufacturerId == request.auth.uid);
    }
    
    // RFQ Responses - manufacturer can manage their own responses
    match /rfqResponses/{responseId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && 
                      request.resource.data.manufacturerId == request.auth.uid;
      allow update: if request.auth != null && 
                      resource.data.manufacturerId == request.auth.uid;
    }
  }
}
```

## What These Rules Enable

1. **Users**: Each user can only access their own user document
2. **Manufacturer Profiles**: All authenticated users can read (for discovery), only owner can write
3. **Brand Profiles**: All authenticated users can read (so manufacturers see brand names on RFQs), only owner can write
4. **Products**: All authenticated users can read (for browsing), only the manufacturer who owns the product can write
5. **RFQs**: 
   - **READ**: Both the brand who created it AND the manufacturer it was sent to can read
   - **CREATE**: Only brands can create RFQs (must set themselves as brandId)
   - **UPDATE**: Both brand and manufacturer can update (for status changes, responses)
6. **RFQ Responses**: Any authenticated user can read, only the manufacturer can create/update their response

## After Publishing

Once these rules are published, the RFQ flow should work:
1. Brand creates RFQ → Stored with `brandId = brand's user.uid` and `manufacturerId = manufacturer's profile doc ID`
2. Manufacturer views RFQs → Query filters by `manufacturerId == their user.uid`
3. Since manufacturer profile doc ID = manufacturer user.uid, the query matches!
