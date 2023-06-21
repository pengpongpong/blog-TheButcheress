"use client"
import { TextField, ThemeProvider, createTheme } from "@mui/material"
import * as yup from "yup"
import React from 'react'
import { ParamsProps } from "../page";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


//theme for text inputs
const theme = createTheme({
    components: {
        // Name of the component
        MuiInputBase: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    fontFamily: "Josefin Slab",
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    fontFamily: "Josefin Slab",
                }
            }
        }
    },
});

const LoginPage = async ({ params: { lang } }: ParamsProps) => {

    //validation schema
    const schema = yup
        .object({
            name: yup.string().required(),
            password: yup.string().required(),
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
            password: "",
        }
    })

    //submit form
    const onSubmit = handleSubmit((data) => {
        // console.log(data)
    });


    return (
        <main className="flex-grow">
            <form onSubmit={onSubmit} className="mx-4 lg:mx-auto w-auto lg:w-1/3 flex flex-col font-text">
                <ThemeProvider theme={theme}>
                    <TextField style={{ marginBottom: "1rem" }} {...register("name")} id="outlined-basic" label="Name" variant="outlined" className="font-text" inputProps={{ classes: { input: "font-headline" } }} />
                    <TextField type="password" style={{ marginBottom: "1rem" }} {...register("password")} id="outlined-basic" label="Email" variant="outlined" />
                </ThemeProvider>
                <input type="submit" className="w-full py-2 border border-grey hover:border-neutral text-lg font-bold rounded cursor-pointer hover:bg-primary transition duration-300" defaultValue={"Login"} />
            </form>
        </main>

    )

}

export default LoginPage