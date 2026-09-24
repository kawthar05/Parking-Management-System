Backend part of the Parking Management System



How to run

cd backend
npm install
cp .env.example .env          # edit MONGO_URI and JWT_SECRET
# Make sure MongoDB is running
npm run dev


# ParkSmart Backend

## Setup
1. `npm install`
2. Copy `.env.example` → `.env` and fill values
3. Make sure MongoDB is running
4. `npm run dev`

API runs on `http://localhost:5000`

# mongodb+srv://realkawthar67_db_user:<db_password>@parksmart.cloxmm7.mongodb.net/

# mongodb+srv://realkawthar67_db_user:<db_password>@parksmart.cloxmm7.mongodb.net/


/* const user = await User.create({ 
    name, 
    email, 
    password, 
    role 
  }) 
  


  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})*/