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
import BaseUrl from "../../AxiosInstance/BaseUrl";

const EditDestinationModal = ({
  destination,
  setEditDestination,
  fetchDestinations,
}) => {
  const [opened, { open, close }] = useDisclosure(true);
  const isMobile = useMediaQuery("(max-width: 50em)"); // For mobile screen detection
  const [loading, setLoading] = useState(false);
  const initialData = destination || {
    destination_name: "",
    images: "",
    images_1: "",
    images_2: "",
    description: "",
    price: "",
    itinerary: "",
    review: "",
  };

  const [formData, setFormData] = useState({
    destination_name: initialData.destination_name,
    images: initialData.images,
    images_1: initialData.images_1,
    images_2: initialData.images_2,
    description: initialData.description,
    price: initialData.price,
    itinerary: initialData.itinerary,
    review: initialData.review,
  });
  console.log("destinationiDDDD", destination.id);

  console.log("destinationiDDDD", formData);

  const fileInputRefs = {
    images: useRef(),
    images_1: useRef(),
    images_2: useRef(),
  };

  const handleFileClick = (inputName) => {
    fileInputRefs[inputName].current.click();
  };

  const handleFileChange = (e, inputName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [inputName]: file.name }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateDestination = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const submissionData = new FormData();
      submissionData.append("destination_name", formData.destination_name);
      submissionData.append("images", fileInputRefs.images.current?.files[0]);
      submissionData.append(
        "images_1",
        fileInputRefs.images_1.current?.files[0]
      );
      submissionData.append(
        "images_2",
        fileInputRefs.images_2.current?.files[0]
      );
      submissionData.append("description", formData.description);
      submissionData.append("price", formData.price);
      submissionData.append("itinerary", formData.itinerary);
      submissionData.append("review", formData.review);

      await BaseUrl.patch(
        `/api/destinations/${destination.id}/`,
        submissionData
      );
      alert("Destination updated successfully!");
      console.log("Submission Data:", submissionData);
      fetchDestinations(); // Refresh data
      close();
      setEditDestination(null); // Close modal
    } catch (error) {
      console.error("Failed to update destination:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Edit Destination"
      fullScreen={isMobile} // Full-screen on mobile
      overlayProps={{ opacity: 0.4, blur: 3 }}
      size="lg"
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      <LoadingOverlay visible={loading} overlayBlur={2} />
      <form onSubmit={handleUpdateDestination} style={{ position: "relative" }}>
        <Grid gutter="md">
          <Grid.Col span={12}>
            <TextInput
              label="Destination Name"
              placeholder="Enter destination name"
              name="destination_name"
              value={formData.destination_name}
              onChange={handleInputChange}
              required
            />
          </Grid.Col>

          {["images", "images_1", "images_2"].map((inputName, index) => (
            <Grid.Col span={12} md={6} key={index}>
              <TextInput
                label={`Image ${index + 1}`}
                value={formData[inputName] || "No file selected"}
                readOnly
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              minRows={3}
            />
          </Grid.Col>
        </Grid>

        <Group position="center" mt="lg">
          <Button
            type="submit"
            size="md"
            radius="md"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
          >
            Update
          </Button>
          <Button
            size="md"
            radius="md"
            variant="outline"
            color="gray"
            onClick={() => setEditDestination(null)}
          >
            Cancel
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default EditDestinationModal;
