const Profile = require('../models/Profile');

// @desc    Get profile
// @route   GET /api/profile
// @access  Public
const getProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({
        name: 'Riya Singh',
        title: 'Full-Stack Developer | Software Developer | UI/UX Developer',
        eyebrow: 'FULL-STACK DEVELOPER × UI/UX',
        headline: 'BUILDING DIGITAL EXPERIENCES.',
        scriptAccent: 'Creative Engineer',
        aboutTitle: 'ENGINEER. DESIGNER. PROBLEM SOLVER.',
        tagline: 'Computer Science engineer building scalable web applications, data-driven products and intuitive digital experiences.',
        bio: 'Final-year B.Tech Computer Science student with strong skills in software development, full-stack web development, and problem-solving. Proficient in Java, Python, SQL, JavaScript, React.js, Node.js, Express.js, and MongoDB, with hands-on experience building scalable and efficient web applications.',
        email: 'riyarssingh22@gmail.com',
        phone: '+91 8340154678',
        location: 'Punjab / Jharkhand, India',
        resumeUrl: '/resume.pdf',
        profileImage: '/riya-profile.jpg',
        availableForWork: true,
        stats: [
          { label: 'CGPA', value: '8.8 / 10', subtitle: 'Academic Excellence' },
          { label: 'WORKSHOPS', value: '30+', subtitle: 'Conducted & Led' },
          { label: 'STUDENTS REACHED', value: '500+', subtitle: 'Community Impact' },
          { label: 'EXPERIENCE', value: 'FULL-STACK', subtitle: 'React, Node, Mongo' }
        ],
        socialLinks: {
          github: 'https://github.com/Riya834',
          linkedin: 'https://www.linkedin.com/in/riya-singh-5b71b7248/?skipRedirect=true',
          email: 'mailto:riyarssingh22@gmail.com'
        }
      });
    }
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

// @desc    Update profile
// @route   PUT /api/profile
// @access  Private (Admin)
const updateProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (profile) {
      profile = await Profile.findByIdAndUpdate(profile._id, req.body, { new: true, runValidators: true });
    } else {
      profile = await Profile.create(req.body);
    }
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
