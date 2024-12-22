import React, { useRef, useState } from "react";
import {
  Modal,
  Button,
  TextInput,
  Textarea,
  NumberInput,
  Grid,
  Group,
  LoadingOverlay,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import BaseUrl from "../../AxiosInstance/BaseUrl";

const CreateDestinationModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 50em)"); // For mobile screen detection
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    destination_name: "",
    images: "",
    images_1: "",
    images_2: "",
    description: "",
    price: "",
    itinerary: "",
    review: "",
  });

  const fileInputRefs = {
    images: useRef(),
    images_1: useRef(),
    images_2: useRef(),
  };

  // Handle file input
  const handleFileClick = (inputName) => {
    fileInputRefs[inputName].current.click();
  };

  const handleFileChange = (e, inputName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [inputName]: file.name }));
    }
  };

  // Handle other form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create a FormData object
      const submissionData = new FormData();
      submissionData.append("destination_name", formData.destination_name);
      submissionData.append("images", fileInputRefs.images.current.files[0]);
      submissionData.append(
        "images_1",
        fileInputRefs.images_1.current.files[0]
      );
      submissionData.append(
        "images_2",
        fileInputRefs.images_2.current.files[0]
      );
      submissionData.append("description", formData.description);
      submissionData.append("price", formData.price);
      submissionData.append("itinerary", formData.itinerary);
      submissionData.append("review", formData.review);

      // Post data with Axios
      const response = await BaseUrl.post(
        "http://127.0.0.1:8000/api/destinations/",
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert("Destination added successfully!");
        close();
        setFormData({
          destination_name: "",
          images: "",
          images_1: "",
          images_2: "",
          description: "",
          price: "",
          itinerary: "",
          review: "",
        });
      }
    } catch (error) {
      console.error("Error adding destination:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Modal Trigger */}
      <Group position="center" mt="xl">
        <Button
          variant="gradient"
          gradient={{ from: "teal", to: "blue" }}
          onClick={open}
        >
          ADD NEW DESTINATION
        </Button>
      </Group>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title="Add New Destination"
        fullScreen={isMobile} // Full-screen on mobile
        overlayProps={{ opacity: 0.4, blur: 3 }}
        size="lg"
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <LoadingOverlay visible={loading} overlayBlur={2} />
        <form onSubmit={handleSubmit} style={{ position: "relative" }}>
          <Grid gutter="md">
            <Grid.Col span={12}>
              <TextInput
                label="Destination Name"
                placeholder="Enter destination name"
                name="destination_name"
                value={formData.destination_name}
                onChange={handleChange}
                required
              />
            </Grid.Col>

            {["images", "images_1", "images_2"].map((inputName, index) => (
              <Grid.Col span={12} md={6} key={index}>
                {" "}
                {/* 12 columns on small screen, 6 on medium+ */}
                <TextInput
                  label={`Image ${index + 1}`}
                  value={formData[inputName] || "No file selected"}
                  readOnly
                  required
                />
                <Group mt="xs">
                  <Button
                    variant="outline"
                    onClick={() => handleFileClick(inputName)}
                  >
                    Choose File
                  </Button>
                  <input
                    ref={fileInputRefs[inputName]}
                    type="file"
                    name={inputName}
                    onChange={(e) => handleFileChange(e, inputName)}
                    style={{ display: "none" }}
                  />
                </Group>
              </Grid.Col>
            ))}

            <Grid.Col span={12}>
              <Textarea
                label="Description"
                placeholder="Enter description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                minRows={3}
              />
            </Grid.Col>

            <Grid.Col span={12} md={6}>
              <NumberInput
                label="Price"
                placeholder="Enter price"
                name="price"
                value={formData.price}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, price: value }))
                }
                required
                min={0}
              />
            </Grid.Col>

            <Grid.Col span={12} md={6}>
              <NumberInput
                label="Itinerary (Days)"
                placeholder="Enter itinerary days"
                name="itinerary"
                value={formData.itinerary}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, itinerary: value }))
                }
                min={0}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <Textarea
                label="Review"
                placeholder="Enter review"
                name="review"
                value={formData.review}
                onChange={handleChange}
                minRows={3}
              />
            </Grid.Col>
          </Grid>

          {/* Submit Button */}
          <Group position="center" mt="lg">
            <Button
              type="submit"
              size="md"
              radius="md"
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
            >
              Submit
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default CreateDestinationModal;
