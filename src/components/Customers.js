import React, { useEffect, useState } from "react";
import { Table, Modal, Input, message } from "antd";
import axios from "axios";
import Swal from "sweetalert2";

export default function Customers() {
  const [country_list, setcountry_list] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [channel, setchannel] = useState();
  const [address, setaddress] = useState();
  const [postal, setpostal] = useState();
  const [city, setcity] = useState();
  const [province, setprovince] = useState();
  const [country, setcountry] = useState();

  useEffect(() => {
    getCustomersList();
  }, []);

  const getCustomersList = async () => {
    let url = `https://waveaccounting.github.io/se-challenge-fe-customers/settings.json`;
    let data = await axios.get(url);
    console.log(data?.data);
    setcountry_list(data?.data);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    saveChanges();

    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const saveChanges = async () => {
    let data = {
      name: name,
      email: email,
      channel: channel,
      address: address,
      postal: postal,
      city: city,
      province: province,
      country: country,
    };
    console.log(data);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
      editable: false,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
      editable: false,
    },
    {
      title: "Channel",
      dataIndex: "channel",
      width: "15%",
      editable: false,
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "15%",
      editable: false,
    },
    {
      title: "Postal",
      dataIndex: "postal",
      width: "15%",
      editable: false,
    },
    {
      title: "City",
      dataIndex: "city",
      width: "15%",
      editable: false,
    },
    {
      title: "Provice",
      dataIndex: "province",
      width: "15%",
      editable: false,
    },
    {
      title: "Country",
      dataIndex: "country",
      width: "15%",
      editable: false,
    },
    {
      title: "Action",
      //   dataIndex: "country",
      width: "15%",
      render: (e) => {
        return (
          <>
            <a
              onClick={() => {
                console.log(e, "---->onclick");
                setname(e.name);
                setchannel(e.channel);
                setaddress(e.address);
                setcity(e.city);
                setcountry(e.country);
                setemail(e.email);
                setpostal(e.postal);
                setprovince(e.province);
                showModal();
              }}
            >
              action
            </a>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Table
        bordered
        dataSource={country_list ? country_list?.customers : []}
        columns={columns}
        // rowClassName="editable-row"
        pagination
      />
      {/* Modal Edit */}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => {
          if (name == "" || email == "") {
            Swal.fire({
              text: "Please fill the mandatory fields!!",
              icon: "error",
              confirmButtonText: "Cool",
            });
          } else if (
            channel != "website" ||
            channel != "email" ||
            channel != "phone" ||
            channel != "word-of-mouth" ||
            channel != "other" ||
            channel != "unknown"
          ) {
            Swal.fire({
              text: "Please enter the correct channel!!",
              icon: "error",
              confirmButtonText: "Cool",
            });
          } else {
            handleOk();
          }
        }}
        onCancel={handleCancel}
      >
        <Input
          required
          style={{ marginTop: "10px" }}
          value={name}
          placeholder="Name"
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
        <Input
          required
          style={{ marginTop: "10px" }}
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setemail(e.target.email);
          }}
        />
        <Input
          style={{ marginTop: "10px" }}
          value={channel}
          placeholder="Channel"
          onChange={(e) => {
            setchannel(e.target.value);
          }}
        />
        <Input
          style={{ marginTop: "10px" }}
          value={address}
          placeholder="Address"
          onChange={(e) => {
            setaddress(e.target.value);
          }}
        />
        <Input
          style={{ marginTop: "10px" }}
          value={postal}
          placeholder="Postal"
          onChange={(e) => {
            setpostal(e.target.value);
          }}
        />
        <Input
          style={{ marginTop: "10px" }}
          value={city}
          placeholder="City"
          onChange={(e) => {
            setcity(e.target.value);
          }}
        />
        <Input
          style={{ marginTop: "10px" }}
          value={province}
          placeholder="Province"
          onChange={(e) => {
            setprovince(e.target.value);
          }}
        />
        <Input
          style={{ marginTop: "10px" }}
          value={country}
          placeholder="Country"
          onChange={(e) => {
            setcountry(e.target.value);
          }}
        />
      </Modal>
    </>
  );
}
