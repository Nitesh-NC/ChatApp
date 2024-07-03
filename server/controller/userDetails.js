

async function userDetails(request,response){
    try{
        const token = request.cookies['token'];

        if(!token){
            return response.status(401).json({
                messagge: "no token"
            })
        }

        const JWT_SECRET_KEY = request.app.get('jwt-secret-key')

        jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Failed to authenticate token' });
            }

            // Token is valid, proceed with fetching user details
            const userId = decoded.id; // Assuming the token contains the user ID
            
            // Fetch user details from the database or any other source
           

            return res.status(200).json({ user });
        });
    }
    catch(error){
        console.log("error fetching", error)
    }

}

module.exports = userDetails