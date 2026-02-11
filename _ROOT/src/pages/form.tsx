/* Opgave: Byg en kontaktformular med useState
 
Opgavebeskrivelse: 
Lav en komponent med React useState Hook, som kan vise og sende en formular.

Opgavekrav:
FÆRDIG: Formularen skal indeholde følgende felter:
FÆRDIG - Fulde navn
FÆRDIG - Telefonnummer
FÆRDIG - Email
FÆRDIG - Kommentar
FÆRDIG - Mulighed for valg af foretrukken kontaktmetode: telefon eller email
FÆRDIG: Derudover skal formularen også indeholde en knap til at sende, en besked der viser om man har "sendt" og 
en knap til at nulstille felterne med.

FÆRDIG: Ved siden af formularen skal der være et tomt felt som kan vise de inputværdier som sendes med formularen. Værdierne 
skal løbende vises når en bruger indtaster en karakter.
*/

/* Source for the creation of pages:
react-router-codealong-med-kasper

For this exercise, the home page of react-gallery-wrapper was used as a template.
I also used a modified version of the reset button from the stopwatch exercise.
*/
import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router";
import gridstyling from "../components/shared/atoms/grid.module.scss";

import { SectionH1to2ByMariePierreLessard } from "../components/main-el/section-h1-2";
import { GridByMariePierreLessard } from "../components/shared/atoms/grid";
// import { CardWithFormByMariePierreLessard, CardWithDivByMariePierreLessard } from "../components/shared/m-and-o/card";
import {
    ControlledInputForStringByMariePierreLessard,
    ControlledInputForPhoneByMariePierreLessard,
    ControlledInputForEmailByMariePierreLessard,
    ControlledInputForRadioOrCheckByMariePierreLessard,
    ControlledTextAreaByMariePierreLessard,
    ControlledInputForPasswordByMariePierreLessard
} from "../components/shared/m-and-o/input-group";
import { MultiTypeBtnComponentByMariePierreLessard } from "../components/shared/atoms/btns";
import { 
    specialCharTestByMariePierreLessard, 
    digitTestByMariePierreLessard,
    validatePhoneNoByMariePierreLessard,
    validateEmailByMariePierreLessard,
    validateMsgByMariePierreLessard 
} from "../helpers/validations";

export const FormPageByMariePierreLessard = () => {

    /* See notes and sources regarding useOutletContext in file global-layout.tsx 
    Interestingly, I get an error until I specify that the type of useOutletContext is any.
    I tried with <string>, but it doesn't work, even though the only prop sent is typed as a string in global-layout.tsx. 
    I am guessing that the react-router people might prefer useOutletContext to always have the type any because it is
    a context that can pass a whole variety of props. The app is more future-proof that way... */
    const { activeNavItemByMariePierreLessard } = useOutletContext<any>();

    const [nameByMariePierreLessard, setNameByMariePierreLessard] = useState<string>("");
    const [phoneByMariePierreLessard, setPhoneByMariePierreLessard] = useState<string>("");
    const [emailByMariePierreLessard, setEmailByMariePierreLessard] = useState<string>("");
    const [passwordByMariePierreLessard, setPasswordByMariePierreLessard] = useState<string>("");
    const [preferredMeansOfComByMariePierreLessard, setPreferredMeansOfComByMariePierreLessard] = useState<string>("E-mail preferred (default choice)");
    const [messageByMariePierreLessard, setMessageByMariePierreLessard] = useState<string>("");
    const [formErrorByMariePierreLessard, setFormErrorByMariePierreLessard] = useState<string>("");

    /* This is used by several sets of validations (HTML5 validation), which should be identical.
    There is no noscript element for the HTML5 validation to work, but it's forward thinking. */
    const minLengthNameByMariePierreLessard = 2;
    const maxLengthNameByMariePierreLessard = 40;
    /* REMINDER: if I edit the min and max for phone numbers, the same needs to be done in file validation.ts.
    It does not appear to be possible to pass a variable inside of a regex. */
    const minLengthPhoneByMariePierreLessard = 8;
    const maxLengthPhoneByMariePierreLessard = 14;
    const minLengthEmailByMariePierreLessard = 6;
    const maxLengthEmailByMariePierreLessard = 255;
    const minLengthPasswordByMariePierreLessard = 2;
    const maxLengthPasswordByMariePierreLessard = 40;
    /* REMINDER: if I edit the min and max for message length, the same needs to be done in file validation.ts.
    It does not appear to be possible to pass a variable inside of a regex. */
    const minLengthMessageByMariePierreLessard = 10;
    const maxLengthMessageByMariePierreLessard = 400;

    const resetByMariePierreLessard = () => {
        setNameByMariePierreLessard("");
        setPhoneByMariePierreLessard("");
        setEmailByMariePierreLessard("");
        setPreferredMeansOfComByMariePierreLessard("E-mail preferred (default choice)");
        setMessageByMariePierreLessard("");
        setPasswordByMariePierreLessard("");
    };

    /* For some reason, I can't enter a parameter in parentheses with useNavigate(): 0 argument expected.
    But when I invoke/call redirectByMariePierreLessard in another function, I can enter an argument, such as a url. 
    
    Source for useNavigate hook:
    Caleb Curry, "Redirect with useNavigate Hook: React Tutorial 24" on YouTube
    */
    const redirectByMariePierreLessard = useNavigate();
    const validateOnSubmitByMariePierreLessard = (e: any) => {
        /* The validations inside of the buttons do not provide a validation functionality on submit to the form itself.
        They only give real-time feedback to the user.
        */
        e.preventDefault();

        if (
            nameByMariePierreLessard.trim() === ""
            || phoneByMariePierreLessard.trim() === ""
            || emailByMariePierreLessard.trim() === ""
            || passwordByMariePierreLessard.trim() === ""
            || messageByMariePierreLessard.trim() === ""
            || nameByMariePierreLessard.length < minLengthNameByMariePierreLessard
            || phoneByMariePierreLessard.length < minLengthPhoneByMariePierreLessard
            || emailByMariePierreLessard.length < minLengthEmailByMariePierreLessard
            || passwordByMariePierreLessard.length < minLengthPasswordByMariePierreLessard
            || messageByMariePierreLessard.length < minLengthMessageByMariePierreLessard
            || nameByMariePierreLessard.length > maxLengthNameByMariePierreLessard
            || phoneByMariePierreLessard.length > maxLengthPhoneByMariePierreLessard
            || emailByMariePierreLessard.length > maxLengthEmailByMariePierreLessard
            || passwordByMariePierreLessard.length > maxLengthPasswordByMariePierreLessard
            || messageByMariePierreLessard.length > maxLengthMessageByMariePierreLessard
            || !specialCharTestByMariePierreLessard(passwordByMariePierreLessard)
            || !digitTestByMariePierreLessard(passwordByMariePierreLessard)
            || !validatePhoneNoByMariePierreLessard(phoneByMariePierreLessard)
            || !validateEmailByMariePierreLessard(emailByMariePierreLessard)
            || !validateMsgByMariePierreLessard(messageByMariePierreLessard)
        ) {
            setFormErrorByMariePierreLessard("Please fill all fields correctly before submitting.");
        } else {
            /* I am not posting with fetch() here because this assignment is not associated with a server. 
            This relative path adds /thanks to the URL of the form, in this case:
            ./form/thanks
            */
            redirectByMariePierreLessard("./thanks");
        };
    };

    return (
        <SectionH1to2ByMariePierreLessard
            id={"form"}
            h1={`React Child Components: ${activeNavItemByMariePierreLessard}`}
            h2={"Exercise 2 from Section 3.4"}
        >
            <p>The instructions did not require a password field. I added it to show that I spent time on improving that component, which I created in an earlier assignment. Its logic is now consistent with the logic that I used for these new validated inputs.</p>
            <GridByMariePierreLessard className={gridstyling.formGridByMariePierreLessard}>
                <form noValidate onSubmit={validateOnSubmitByMariePierreLessard}
                    className={gridstyling.fieldsetByMariePierreLessard}
                >
                    <ControlledInputForStringByMariePierreLessard
                        state={nameByMariePierreLessard}
                        action={setNameByMariePierreLessard}
                        type={"text"}
                        labelText={"Full name: "}
                        value={""}
                        placeholder={"Enter your full name"}
                        for_id_name={"name"}
                        minLength={minLengthNameByMariePierreLessard}
                        maxLength={maxLengthNameByMariePierreLessard}
                        autoComplete={"on"}
                        required
                        className={gridstyling.inputGroupByMariePierreLessard}
                    />
                    <ControlledInputForPhoneByMariePierreLessard
                        state={phoneByMariePierreLessard}
                        action={setPhoneByMariePierreLessard}
                        labelText={"Phone: "}
                        value={""}
                        placeholder={"Enter your phone number"}
                        for_id_name={"phone"}
                        minLength={minLengthPhoneByMariePierreLessard}
                        maxLength={maxLengthPhoneByMariePierreLessard}
                        pattern={"^[0-9 ()\-+]{8,14}$"}
                        autoComplete={"on"}
                        className={gridstyling.inputGroupByMariePierreLessard}
                        />
                    <ControlledInputForEmailByMariePierreLessard
                        state={emailByMariePierreLessard}
                        action={setEmailByMariePierreLessard}
                        labelText={"E-mail: "}
                        value={""}
                        placeholder={"Enter your e-mail address"}
                        for_id_name={"email"}
                        minLength={minLengthEmailByMariePierreLessard}
                        maxLength={maxLengthEmailByMariePierreLessard}
                        pattern={"^[a-zA-ZæÆøØåÅ0-9._%+\-]+@[a-zA-ZæÆøØåÅ0-9.\-]+\.[a-zA-ZæÆøØåÅ]{2,40}$"}
                        autoComplete={"on"}
                        required
                        className={gridstyling.inputGroupByMariePierreLessard}
                        />
                    <ControlledInputForPasswordByMariePierreLessard
                        state={passwordByMariePierreLessard}
                        action={setPasswordByMariePierreLessard}
                        labelText={"Password: "}
                        value={""}
                        placeholder={"Enter your password"}
                        for_id_name={"password"}
                        minLength={minLengthPasswordByMariePierreLessard}
                        maxLength={maxLengthPasswordByMariePierreLessard}
                        autoComplete={"on"}
                        required
                        className={gridstyling.inputGroupByMariePierreLessard}
                        />
                    <p>Preferred means of communication: </p>
                    <div>
                        <ControlledInputForRadioOrCheckByMariePierreLessard
                            state={"Phone preferred"}
                            action={setPreferredMeansOfComByMariePierreLessard}
                            type={"radio"}
                            labelText={"Phone"}
                            value={"Phone preferred"}
                            for_id={"telPref"}
                            name={"preferredMeansOfCommunication"}
                            className={gridstyling.radioBtnGroupByMariePierreLessard}
                            />
                        <ControlledInputForRadioOrCheckByMariePierreLessard
                            state={"E-mail preferred"}
                            action={setPreferredMeansOfComByMariePierreLessard}
                            type={"radio"}
                            labelText={"E-mail"}
                            value={"E-mail preferred"}
                            for_id={"emailPref"}
                            name={"preferredMeansOfCommunication"}
                            className={gridstyling.radioBtnGroupByMariePierreLessard}
                        />
                    </div>
                    <ControlledTextAreaByMariePierreLessard
                    /* According to console log errors, text areas have a value or defaultValue prop to be used 
                    instead of children. */
                        state={messageByMariePierreLessard}
                        action={setMessageByMariePierreLessard}
                        labelText={"Your enquiry: "}
                        value={""}
                        placeholder={"Leave a message"}
                        for_id_name={"message"}
                        minLength={minLengthMessageByMariePierreLessard}
                        maxLength={maxLengthMessageByMariePierreLessard}
                        required
                        className={gridstyling.textAreaGroupByMariePierreLessard}
                    />
                    <div className={gridstyling.btnX2GroupByMariePierreLessard}>
                        <MultiTypeBtnComponentByMariePierreLessard
                            type={"reset"}
                            action={resetByMariePierreLessard}
                        >
                            Reset
                        </MultiTypeBtnComponentByMariePierreLessard>
                        {/* I didn't use MultiTypeBtnComponentByMariePierreLessard here since I put
                        the event listener on the form instead of the button.
                        <button type="submit" onClick={validateOnSubmitByMariePierreLessard}>
                        */}
                        <button type="submit">
                            Submit
                        </button>
                    </div>
                </form>
                <div className={gridstyling.viewerByMariePierreLessard}>
                    <p>{nameByMariePierreLessard}</p>
                    <p>{phoneByMariePierreLessard}</p>
                    <p>{emailByMariePierreLessard}</p>
                    <p>{passwordByMariePierreLessard}</p>
                    <p>{preferredMeansOfComByMariePierreLessard}</p>
                    <p>{messageByMariePierreLessard}</p>
                    <p className={gridstyling.attentionByMariePierreLessard}>{formErrorByMariePierreLessard}</p>
                </div>
            </GridByMariePierreLessard>
        </SectionH1to2ByMariePierreLessard>
    );
};