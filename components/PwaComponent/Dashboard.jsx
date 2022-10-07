import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from 'node_modules/next/link';

function Dashboard(props) {
  return (
    <div className="container">
      <p className="h3 px-0  bitter-italic-normal-medium-24 mt-2">Dashboard</p>
      <div className="row row-cols-sm-2 row-cols-lg-5 g-2 g-lg-2 mt-3">
        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard ">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/planning.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">Planning</a>
          </div>
        </div>
        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/AddParitaircomite.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">Add paritair comite</a>
          </div>
        </div>
      </div>

      <div className="row row-cols-sm-2 row-cols-lg-5 g-2 g-lg-2 mt-3">
        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/Manageproject.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">Manage project</a>
          </div>
        </div>

        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/Signed.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">Add signature</a>
          </div>
        </div>
      </div>
      <div className="row row-cols-sm-2 row-cols-lg-5 g-2 g-lg-2 mt-3">
        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/manageusers.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">Manage Users</a>
          </div>
        </div>

        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/Manageemployee.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">Manage Employees</a>
          </div>
        </div>
      </div>
      <div className="row row-cols-sm-2 row-cols-lg-5 g-2 g-lg-2 mt-3">
        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/Myaccount.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">My Account</a>
          </div>
        </div>

        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/Werkpostfiches.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>

            <a type="button">My Werkpostfiches</a>
          </div>
        </div>
      </div>
      <div className="row row-cols-sm-2 row-cols-lg-5 g-2 g-lg-2 mt-3">
        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/Mydocuments.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">My documents</a>
          </div>
        </div>

        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/Managecostcenter.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">Manage cost center</a>
          </div>
        </div>
      </div>

      <div className="row row-cols-sm-2 row-cols-lg-5 g-2 g-lg-2 mt-3">
        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/Viewagreement.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">View agreement</a>
          </div>
        </div>

        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/Werkpostfiches.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button"> Werkpostfiches </a>
          </div>
        </div>
      </div>
      <div className="row row-cols-sm-2 row-cols-lg-5 g-2 g-lg-2 mt-3">
        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/Pincode.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button"> My personal pincode </a>
          </div>
        </div>

        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/myinvitations.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">My Invitations</a>
          </div>
        </div>
      </div>

      <div className="row row-cols-sm-2 row-cols-lg-5 g-2 g-lg-2 mt-3">
        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/Mycontract.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">My Contracts</a>
          </div>
        </div>

        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/planning.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">My planning</a>
          </div>
        </div>
      </div>

      <div className="row row-cols-sm-2 row-cols-lg-5 g-2 g-lg-2 mt-3">
        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/qrcode.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">Scan in</a>
          </div>
        </div>

        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/Myinvoice.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">My Invoices</a>
          </div>
        </div>
      </div>

      <div className="row row-cols-sm-2 row-cols-lg-5 g-2 g-lg-2 mt-3">
        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/Managelocation.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">Manage locations</a>
          </div>
        </div>

        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/ManageParitaircomite.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">Manage companies</a>
          </div>
        </div>
      </div>

      <div className="row row-cols-sm-2 row-cols-lg-5 g-2 g-lg-2 mt-3">
        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/Addemployee.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">Add Employee</a>
          </div>
        </div>

        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/PrintQRcode.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">Print QR code</a>
          </div>
        </div>
      </div>

      <div className="row row-cols-sm-2 row-cols-lg-5 g-2 g-lg-2 mt-3">
        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/Mytodo.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">My Todo&apos;s</a>
          </div>
        </div>
        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/Timeregistration.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">Time registration</a>
          </div>
        </div>
      </div>

      <div className="row row-cols-sm-2 row-cols-lg-5 g-2 g-lg-2 mt-3">
        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/Category.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">Manage category</a>
          </div>
        </div>

        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/Website.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">Website</a>
          </div>
        </div>
      </div>

      <div className="row row-cols-sm-2 row-cols-lg-5 g-2 g-lg-2 mt-3">
        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/cooperationagreement.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button"> Cooperation agreement</a>
          </div>
        </div>

        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/Configurationsandsettings.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">Configuration and settings</a>
          </div>
        </div>
      </div>

      <div className="row row-cols-sm-2 row-cols-lg-5 g-2 g-lg-2 mt-3">
        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/ManageParitaircomite.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">Manage Paritair comite</a>
          </div>
        </div>

        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/Manageemployeetypes.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>
            <a type="button">Manage Employers</a>
          </div>
        </div>
      </div>

      <div className="row row-cols-sm-2 row-cols-lg-5 g-2 g-lg-2 mt-3">
        <div className="col  bg-light mb-2 me-3 p-4 ">
          <div className="p-2 position_relative_dashboard">
            <Link href='' className="m-2">
              <a type="button">
                <Image src="/images/Function.svg" layout="fill" className="dasboard_image "></Image>

              </a>

            </Link>

          </div>
          <div className='text-center '>

            <a type="button">Manage functions</a>
          </div>
        </div>
      </div>

    </div>


  );
}
export default Dashboard;
