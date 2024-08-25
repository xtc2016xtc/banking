'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '@/lib/actions/user.actions';
import PlaidLink from "@/components/moenty/PlaidLink";
import CustomInput from "@/components/Header/CustomInput";


const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = authFormSchema(type);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ''
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        try {
            // Sign up with Appwrite & create plaid token

            if(type === 'sign-up') {
                const userData = {
                    firstName: data.firstName!,
                    lastName: data.lastName!,
                    address1: data.address1!,
                    city: data.city!,
                    state: data.state!,
                    postalCode: data.postalCode!,
                    dateOfBirth: data.dateOfBirth!,
                    ssn: data.ssn!,
                    email: data.email,
                    password: data.password
                }

                const newUser = await signUp(userData);

                setUser(newUser);
            }

            if(type === 'sign-in') {
                const response = await signIn({
                    email: data.email,
                    password: data.password,
                })

                if(response) router.push('/')
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="auth-form">
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href="/" className="cursor-pointer flex items-center gap-1">
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="Horizon logo"
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">银行收款</h1>
                </Link>

                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                        {user
                            ? 'Link Account'
                            : type === 'sign-in'
                                ? 'Sign In'
                                : 'Sign Up'
                        }
                        <p className="text-16 font-normal text-gray-600">
                            {user
                                ? 'Link your account to get started'
                                : 'Please enter your details'
                            }
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className="flex flex-col gap-4">
                    <PlaidLink user={user} variant="primary" />
                </div>
            ): (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === 'sign-up' && (
                                <>
                                    <div className="flex gap-4">
                                        <CustomInput control={form.control} name='firstName' label="姓" placeholder='姓' />
                                        <CustomInput control={form.control} name='lastName' label="名" placeholder='名' />
                                    </div>
                                    <CustomInput control={form.control} name='address1' label="地址" placeholder='确认地址' />
                                    <CustomInput control={form.control} name='city' label="城市" placeholder='城市' />
                                    <div className="flex gap-4">
                                        <CustomInput control={form.control} name='state' label="城市缩写" placeholder='城市缩写：NY' />
                                        <CustomInput control={form.control} name='postalCode' label="邮政编码" placeholder='邮政编码：12345' />
                                    </div>
                                    <div className="flex gap-4">
                                        <CustomInput control={form.control} name='dateOfBirth' label="出生日期" placeholder='YYYY-MM-DD' />
                                        <CustomInput control={form.control} name='ssn' label="SSN" placeholder='Example: 1234' />
                                    </div>
                                </>
                            )}

                            <CustomInput control={form.control} name='email' label="账户" placeholder='确认你的账号@example.com' />

                            <CustomInput control={form.control} name='password' label="密码" placeholder='确认密码' />

                            <div className="flex flex-col gap-4">
                                <Button type="submit" disabled={isLoading} className="form-btn">
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" /> &nbsp;
                                            加载中...
                                        </>
                                    ) : type === 'sign-in'
                                        ? '登录' : '注册'}
                                </Button>
                            </div>
                        </form>
                    </Form>

                    <footer className="flex justify-center gap-1">
                        <p className="text-14 font-normal text-gray-600">
                            {type === 'sign-in'
                                ? "没有账户?"
                                : "已有账户?"}
                        </p>
                        <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
                            {type === 'sign-in' ? '注册' : '登录'}
                        </Link>
                    </footer>
                </>
            )}
        </section>
    )
}

export default AuthForm