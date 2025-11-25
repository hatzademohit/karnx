"use client";
import Dashboard from '@/karnx/pages/Dashboard'
import { InquiryDetailsProvider } from '../context/InquiryDetailsContext';

const page = () => {
    return (
        <InquiryDetailsProvider>
            <Dashboard />
        </InquiryDetailsProvider>
    )
}

export default page;