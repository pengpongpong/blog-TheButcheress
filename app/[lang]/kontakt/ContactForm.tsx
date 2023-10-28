"use client"
import { TextField, ThemeProvider, createTheme } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Locale } from "../HomePage";

// theme for text inputs
const theme = createTheme({
    components: {
        // Name of the component
        MuiInputBase: {
            styleOverrides: {
                // Name of the slot
                root: {
                    fontFamily: "Josefin Slab",
                    fontSize: "1.1rem"
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    fontFamily: "Josefin Slab",
                    fontSize: "1.1rem"
                }
            }
        }
    },
});

const Error = ({ text }: { text?: string }) => {
    return <p className="ml-2 mb-4 text-error font-bold">{text}</p>
}

const ContactForm = ({ lang }: { lang: Locale }) => {
    const [message, setMessage] = useState<string>("")
    const nameErrorText = lang === "en" ? "Please enter name" : "Bitte Name eingeben"
    const emailErrorText = lang === "en" ? "Please enter valid email" : "Bitte gültige Email eingeben"
    const messageErrorText = lang === "en" ? "Please enter a message" : "Bitte hinterlasse mir eine Nachricht"

    // validation schema
    const schema = yup
        .object({
            name: yup.string().required(nameErrorText),
            email: yup.string().email().required(emailErrorText),
            textField: yup.string().required(messageErrorText)
        })
        .required()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            textField: ""
        }
    })

    // submit form
    const onSubmit = handleSubmit((data) => {
        fetch("/de/kontakt/api", { method: "POST", body: JSON.stringify({ data, lang }) })
            .then(res => res.json())
            .then(result => {
                if (result.message === "success") {
                    const successMessage = lang === "en" ? "Succesfully submitted!" : "Erfolgreich übermittelt!"
                    setMessage(successMessage)
                } else {
                    setMessage(result.message)
                }
            })
    });

    // clear form after success submit
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitSuccessful, reset])

    return (
        <form onSubmit={onSubmit} className="mx-4 md:mx-8 lg:mx-auto w-auto lg:w-3/5 xl:w-2/5 font-text">
            <fieldset className="flex flex-col">
                <ThemeProvider theme={theme}>
                    <TextField style={{ marginBottom: "1rem" }} {...register("name")} id="outlined-basic" label="Name" variant="outlined" inputProps={{ classes: { input: "font-headline" } }} />
                    {errors?.name && <Error text={errors?.name.message} />}

                    <TextField style={{ marginBottom: "1rem" }} {...register("email")} id="outlined-basic" label="Email" variant="outlined" />
                    {errors?.email && <Error text={errors?.email.message} />}

                    <TextField style={{ marginBottom: "1rem" }} {...register("textField")} label={lang === "en" ? "Message" : "Nachricht"} multiline rows={7} />
                    {errors?.textField && <Error text={errors?.textField.message} />}
                </ThemeProvider>

                <input type="submit" className="w-full py-2 border border-grey hover:border-neutral text-lg font-bold rounded cursor-pointer hover:bg-primary transition duration-300 box-shadow" defaultValue={lang === "en" ? "Submit" : "Abschicken"} />
                {message ? <span className="my-4 font-text text-success text-center">{message}</span> : ""}
            </fieldset>
        </form>
    );
}

export default ContactForm
