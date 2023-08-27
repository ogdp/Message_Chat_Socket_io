import React from "react";
import { Form, Input, Button, message } from "antd";
type Props = {};

const Signup = (props: Props) => {
  const onFinish = async (values: any) => {
    console.log(values);
    try {
      message.success("Thêm sản phẩm thành công");
    } catch (error) {
      message.error("Lỗi khi thêm sản phẩm");
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <section className="flex justify-center h-screen items-center">
        <div className="lg:w-[40%] m-auto rounded-lg px-[3%] pt-[2%] py-[5%] bg-[#f1f1f1] shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px]">
          <h1 className="text-center font-semibold lg:text-5xl lg:my-5">
            Đăng ký
          </h1>
          <Form
            name="signup"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              label="Họ tên"
              name="name"
              rules={[
                { required: true, message: "Tên là trường bắt buộc" },
                {
                  validator: (rule, value) => {
                    if (/\s\s/.test(value)) {
                      return Promise.reject(
                        "Không được nhập nhiều hơn 1 khoảng trắng liên tiếp"
                      );
                    } else if (value && value.trim() === "") {
                      return Promise.reject("Tên là trường bắt buộc");
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <Input className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email là trường bắt buộc" },
                {
                  type: "email",
                  message: "Email sai định dạng",
                },
              ]}
            >
              <Input
                type="email"
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Password là trường bắt buộc" },
                { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
                {
                  validator: (rule, value) => {
                    if (/\s/.test(value)) {
                      return Promise.reject(
                        "Password không được chứa dấu cách"
                      );
                    } else if (value && value.trim() === "") {
                      return Promise.reject("Password là trường bắt buộc");
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <Input
                type="password"
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="default"
                style={{
                  padding: "20px 20px",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "16px",
                }}
                htmlType="submit"
              >
                Đăng ký tài khoản
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </>
  );
};

export default Signup;
