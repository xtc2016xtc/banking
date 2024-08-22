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
import CustomInput from "@/components/Header/CustomInput";
import {logoIcon} from "@/utils";
import { signIn, signUp} from '@/lib/actions/user.actions'

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
        // console.log(data)

        try {
            if(type === 'sign-up') {
                const newUser = await signUp(data)
                setUser(newUser)
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
                        src={logoIcon}
                        width={34}
                        height={34}
                        alt="Horizon logo"
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
                </Link>

                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                        {user
                            ? '链接账户'
                            : type === 'sign-in'
                                ? '登录'
                                : '注册'
                        }
                        <p className="text-16 font-normal text-gray-600">
                            {user
                                ? '正在链接'
                                : '请输入您的详细信息以便更好的服务'
                            }
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className="flex flex-col gap-4">
                    {/*<PlaidLink user={user} variant="primary" />*/}
                </div>
            ): (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === 'sign-up' && (
                                <>
                                    <div className="flex gap-4">
                                        <CustomInput control={form.control} name='firstName' label="姓氏" placeholder='确认您的姓氏' />
                                        <CustomInput control={form.control} name='lastName' label="名字" placeholder='确认您的名字' />
                                    </div>
                                    <CustomInput control={form.control} name='address1' label="地址" placeholder='确认您的地址' />
                                    <CustomInput control={form.control} name='city' label="城市" placeholder='确认您的城市' />
                                    <div className="flex gap-4">
                                        <CustomInput control={form.control} name='state' label="所在国家" placeholder='例如：纽约' />
                                        <CustomInput control={form.control} name='postalCode' label="邮政编码" placeholder='例如: 11101' />
                                    </div>
                                    <div className="flex gap-4">
                                        <CustomInput control={form.control} name='dateOfBirth' label="出生日期" placeholder='默认' />
                                        <CustomInput control={form.control} name='ssn' label="SSN" placeholder='您的身份信息' />
                                    </div>
                                </>
                            )}

                            <CustomInput control={form.control} name='email' label="注册所用的邮件" placeholder='您的邮件' />

                            <CustomInput control={form.control} name='password' label="密码" placeholder='确认您的密码' />

                            <div className="flex flex-col gap-4">
                                <Button type="submit" disabled={isLoading} className="form-btn">
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" /> &nbsp;
                                            Loading...
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
                            {type === 'sign-in' ? '前往注册' : '返回登录'}
                        </Link>
                    </footer>
                </>
            )}
        </section>
    )
}

export default AuthForm