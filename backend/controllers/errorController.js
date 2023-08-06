const renderErrorPage = (req, res) => {
    const errorMessage = "The page you're looking for doesn't exist.";
    res.status(404).render('error/error', { errorMessage });
};

module.exports = {
    renderErrorPage
};
