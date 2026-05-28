module.exports = async (req, res) => {
    res.setHeader('Set-Cookie', 'ld_admin_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0');
    res.setHeader('Location', '/admin.html');
    return res.status(302).end();
};
