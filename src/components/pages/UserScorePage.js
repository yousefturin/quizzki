import  { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useRedirect } from "../../contexts/RedirectContext";
import { generateIdHash } from "../utils/idHashGenerator"
// Decrypt function
const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(
        encryptedData,
        "6d846aa20bfa240f7000b4b616de5d77c30fb268"
    );
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
};

const UserScorePage = () => {
    const location = useLocation();
    const urlParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const idHash = generateIdHash();

    const { setRedirectedParams }= useRedirect();
    
    const navigate = useNavigate();
    // Decrypt data
    const decryptedDisplayName = decryptData(urlParams.get("displayName"));
    const decryptedScore = decryptData(urlParams.get("score"));
    const decryptedIdTest = decryptData(urlParams.get("idTest"));



    useEffect(() => {
        // ***This shit must work correctly as the documentation says, and as CGPT,
        // but i keep getting RunTime error when changing the expectedParams in the browser URL

        // ***When i user is logged in and clicks the container of his 
        // account image it again gives the runtime error with salt error
        const expectedParams = ["displayName", "score", "idTest"];
        console.log("shit iam here")
        // Check if all expected parameters are present in the URL
        const urlParamNames = Array.from(urlParams.keys());
        const missingParams = expectedParams.filter(param => !urlParamNames.includes(param));
    
        // Check if decrypted data is valid
        if (missingParams.length > 0 || !decryptedDisplayName || !decryptedScore || !decryptedIdTest) {
            console.error("Invalid decrypted data or missing parameters. Redirecting to the error page.");
            navigate("/error"); // Redirect to the error page
        } else {
            console.log("Decrypted Display Name:", decryptedDisplayName);
            console.log("Decrypted Score:", decryptedScore);
            console.log("Decrypted idTest:", decryptedIdTest);
        }
            // Log values for debugging
            console.log("urlParams:", urlParamNames);
            setRedirectedParams(decryptedDisplayName, decryptedScore, decryptedIdTest);

            
            // Cleanup function
            return () => {
                clearInterval(decryptedDisplayName, decryptedScore, decryptedIdTest, urlParams);
        };
    }, [decryptedDisplayName, decryptedScore, decryptedIdTest, navigate, urlParams, setRedirectedParams, idHash]);

        return(
            navigate(`/users/record/test/${idHash}`)
        );


};

export default UserScorePage;
