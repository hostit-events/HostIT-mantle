import type { Metadata } from "next";
import {
  CalendarDays,
  CheckCircle,
  CreditCard,
  Share2,
  Users,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/overview";
import Footer from "@/components/shared-components/Footer";
import Header from "@/components/shared-components/Header";

export default function DashboardPage() {
  return (
    <div className="mx-auto space-y-8 max-w-[1280px]">
      <Header />
      <div className="my-10 flex flex-col justify-center items-center">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight">
              Hostit's Metrics Dashboard
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-transparent border-subsidiary group hover:bg-subsidiary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm text-text font-medium group-hover:text-white">
                  Total Events Hosted
                </CardTitle>
                <CalendarDays className="h-6 w-6 text-text group-hover:text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-5xl text-text font-bold group-hover:text-white">
                  5
                </div>
              </CardContent>
            </Card>
            <Card className="bg-transparent border-subsidiary hover:bg-subsidiary group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm text-text font-medium group-hover:text-white">
                  Attendees Checked In
                </CardTitle>
                <Users className="h-6 w-6 text-text group-hover:text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-5xl text-text font-bold group-hover:text-white">
                  2500+
                </div>
              </CardContent>
            </Card>
            <Card className="bg-transparent border-subsidiary hover:bg-subsidiary group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm text-text font-medium group-hover:text-white">
                  On-Chain Transactions
                </CardTitle>
                <CreditCard className="h-6 w-6 text-text group-hover:text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-5xl text-text font-bold group-hover:text-white">
                  2,520+
                </div>
              </CardContent>
            </Card>
            <Card className="bg-transparent border-subsidiary hover:bg-subsidiary group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm text-text font-medium group-hover:text-white">
                  POAPs Shared
                </CardTitle>
                <Share2 className="h-6 w-6 text-text group-hover:text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-5xl text-text font-bold group-hover:text-white">
                  960+
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-transparent border-subsidiary group hover:bg-subsidiary">
              <CardHeader>
                <CardTitle className="text-4xl text-text group-hover:text-white">
                  Events Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-4 md:col-span-3 group text-3xl text-text bg-transparent border-subsidiary hover:bg-subsidiary">
              <CardHeader>
                <CardTitle className="text-text group-hover:text-white">
                  Recent Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-6 w-6 text-text group-hover:text-white" />
                    <div className="ml-4 space-y-1">
                      <p className="text-xl font-semibold leading-none group-hover:text-white">
                        Web3 Lagos Conference 2024
                      </p>
                      <p className="text-sm text-text group-hover:text-white">
                        600+ attendees
                      </p>
                    </div>
                    <a
                      target="_blank"
                      href="https://poap.gallery/drops/178024"
                      className="ml-auto text-xs group-hover:text-white hover:underline"
                    >
                      View POAP drop...
                    </a>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-6 w-6 text-text group-hover:text-white" />
                    <div className="ml-4 space-y-1">
                      <p className="text-xl font-semibold leading-none group-hover:text-white">
                        Borderless 2.0
                      </p>
                      <p className="text-sm text-text group-hover:text-white">
                        400+ attendees
                      </p>
                    </div>
                    <a
                      target="_blank"
                      href="https://poap.gallery/drops/179820"
                      className="ml-auto text-xs group-hover:text-white hover:underline"
                    >
                      View POAP drop...
                    </a>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-6 w-6 text-text group-hover:text-white" />
                    <div className="ml-4 space-y-1">
                      <p className="text-xl font-semibold leading-none group-hover:text-white">
                        Anambra Web3 Conference
                      </p>
                      <p className="text-sm text-text group-hover:text-white">
                        600+ attendees
                      </p>
                    </div>
                    <a
                      target="_blank"
                      href="https://poap.gallery/drops/179804"
                      className="ml-auto text-xs group-hover:text-white hover:underline"
                    >
                      View POAP drop...
                    </a>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-6 w-6 text-text group-hover:text-white" />
                    <div className="ml-4 space-y-1">
                      <p className="text-xl font-semibold leading-none group-hover:text-white">
                        Blockchain In Unilag
                      </p>
                      <p className="text-sm text-text group-hover:text-white">
                        700+ attendees
                      </p>
                    </div>
                    <a
                      target="_blank"
                      href="https://poap.gallery/drops/182686"
                      className="ml-auto text-xs group-hover:text-white hover:underline"
                    >
                      View POAP drop...
                    </a>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-6 w-6 text-text group-hover:text-white" />
                    <div className="ml-4 space-y-1">
                      <p className="text-xl font-semibold leading-none group-hover:text-white">
                        Ife Tech Community
                      </p>
                      <p className="text-sm text-text group-hover:text-white">
                        200+ attendees
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <a
        href="https://blockscout.lisk.com/address/0xe639110D69ec5b5C4ECa926271fa2f82Ee94A2D3"
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-text hover:text-subsidiary text-2xl text-center w-full flex justify-center mb-4"
      >
        View transactions
      </a>
      </div>
    
      <Footer />
    </div>
  );
}
