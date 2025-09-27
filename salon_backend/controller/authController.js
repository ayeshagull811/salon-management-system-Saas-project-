const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;
const Salon = db.Salon;
const UserSalons = db.UserSalons;
const { where } = require("sequelize");

const RegisterUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password_hash,
      phonenumber,
      confirmpassword,
    } = req.body;
    if (!firstname || !lastname || !email || !password_hash) {
      return res.status(400).json({ message: "All fields are required" });
    }
   const ownerRole = await db.Role.findOne({ where: { name: "owner" } });
    if (password_hash !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        message: "already exist email",
      });
    }
    if (password_hash !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const hashedPassword = await bcrypt.hash(password_hash, 10);
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      phonenumber,
  roleId: ownerRole.id,
      password_hash: hashedPassword,
    });
    console.log("new user", newUser);
    // if (salonId) {
    //   // Single salonId case
    //   const salon = await Salon.findByPk(salonId);
    //   if (salon) {
    //     await newUser.addSalon(salon);
    //   }
    // }

    // if (req.body.salonIds && Array.isArray(req.body.salonIds)) {
    //   for (const salonId of req.body.salonIds) {
    //     await UserSalons.create({
    //       userId: newUser.id,
    //       salonId,
    //       roleId: req.body.roleId || role.id, 
    //     });
    //   }
    // }


    res.status(201).json({
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "server err",
      error: error.message,
    });
  }
};
const ResgisterStaff = async ( req , res) =>{
  try {
    console.log('RegisterStaff body:', req.body); 
    const {
      firstname,
      lastname,
      email,
      password_hash,
      phonenumber,
    
      confirmpassword,
      address,
      position,
      department,
      salary,
      experience,
      startDate,
      specialization,
      certifications,
    notes,
      gender,
    } = req.body;
    console.log("RegisterStaff body:", req.body);
      if (!firstname || !lastname || !email || !password_hash) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password_hash !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        message: "already exist email",
      });
    }
    if (password_hash !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const hashedPassword = await bcrypt.hash(password_hash, 10);
    const newStaff = await User.create({
      firstname,
      lastname,
      email,
      phonenumber,
      password_hash: hashedPassword,
      address,
      position,
      department,
      salary,
      experience,
      startDate,
      specialization,
      certifications,
    notes: notes || null,
     
      gender,
    });
if (req.body.SalonId) {
  await UserSalons.create({
    userId: newStaff.id,
    salonId: req.body.SalonId,
    roleId: req.body.roleId || null,  // 👈 staff ka role bhi assign hoga
  });
}

        console.log("new user", newStaff);
         res.status(201).json({
      message: "staff registered successfully",
      newStaff,
    });
  }
   catch (err) {
  console.error("Error submitting form:", err);

  // Send an error response to the frontend
  res.status(500).json({
    message: err.message || "Failed to register staff. Check server logs.",
  });
    };
  };
const LoginUser = async (req, res) => {
  try {
    const { email, password_hash } = req.body;

    // Find user with roles + salons (without deep permission include)
    const existingUser = await db.User.findOne({
      where: { email },
      include: [
        {
          model: db.Salon,
          as: "Salons",
          attributes: ["id", "salon_name", "salon_email", "contact_number", "type"],
          through: { attributes: [] },
        },
        {
          model: db.Role,
          as: "Roles",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });

    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(
      password_hash,
      existingUser.password_hash
    );
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ---- STEP 1: Extract roleIds ----
    const roleIds = existingUser.Roles.map(r => r.id);

    // ---- STEP 2: Query RolePermissions for these roles ----
    const rolePermissions = await db.RolePermissions.findAll({
      where: { roleId: roleIds },
      attributes: ["permissionId"],
    });

    const permissionIds = rolePermissions.map(rp => rp.permissionId);

    // ---- STEP 3: Fetch actual permission names ----
    const permissions = await db.Permission.findAll({
      where: { id: permissionIds },
      attributes: ["name"],
    });

    const permissionNames = permissions.map(p => p.name);

    // ---- STEP 4: Collect role names ----
    const roles = existingUser.Roles.map(r => r.name);

    // ---- STEP 5: Sign JWT ----
    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        roles,
        permissions: permissionNames,
      },
      process.env.JWT_SECRET,
      { expiresIn: "100y" }
    );

    // ---- STEP 6: Send response ----
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: existingUser.id,
        email: existingUser.email,
        firstname: existingUser.firstname,
        lastname: existingUser.lastname,
        salons: existingUser.Salons,
        roles,
        permissions: permissionNames,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

const getStaffById = async (req, res) => {
 try {
    const { SalonId } = req.params;
    const id = Number(SalonId);

    if (!id) {
      return res.status(400).json({ success: false, message: "SalonId is required" });
    }

const staff = await User.findAll({
  include: [
    {
      model: Salon,
      where: { id },
    },
  ],
  attributes: { exclude: ["password_hash", "confirmpassword"] },
  order: [["createdAt", "DESC"]],
});


    if (!staff.length) {
      return res.status(404).json({ success: false, message: "No staff found for this salon" });
    }

    res.json({ success: true, data: staff });
  } catch (err) {
    console.error("getStaffById error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { RegisterUser, LoginUser ,ResgisterStaff ,getStaffById};
