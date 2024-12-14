import React, { useState } from "react";
import { Modal, Button, TextInput, Textarea, NumberInput } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const CreateDestinationModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 50em)");

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

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/destinations/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Destination added successfully!");
        console.log(data);
        close(); // Close the modal
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
      } else {
        alert("Failed to add destination. Please try again.");
      }
    } catch (error) {
      console.error("Error adding destination:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      {/* Modal Trigger */}
      <span className="bg-red-500 text-white w-[80%] rounded-md mt-[3%] text-center">
        <button className="p-2 font-medium" onClick={open}>
          ADD NEW DESTINATION
        </button>
      </span>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title="Add New Destination"
        fullScreen={isMobile}
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Destination Name */}
          <TextInput
            label="Destination Name"
            placeholder="Enter destination name"
            name="destination_name"
            value={formData.destination_name}
            onChange={handleChange}
            required
          />

          {/* Images */}
          <TextInput
            label="Image URL"
            placeholder="Enter main image URL"
            name="images"
            value={formData.images}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Image 1 URL"
            placeholder="Enter secondary image URL"
            name="images_1"
            value={formData.images_1}
            onChange={handleChange}
          />
          <TextInput
            label="Image 2 URL"
            placeholder="Enter another image URL"
            name="images_2"
            value={formData.images_2}
            onChange={handleChange}
          />

          {/* Description */}
          <Textarea
            label="Description"
            placeholder="Enter a short description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          {/* Price */}
          <NumberInput
            label="Price"
            placeholder="Enter price"
            name="price"
            value={formData.price}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, price: value }))
            }
            required
          />

          {/* Itinerary */}
          <NumberInput
            label="Itinerary (Days)"
            placeholder="Enter itinerary days"
            name="itinerary"
            value={formData.itinerary}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, itinerary: value }))
            }
          />

          {/* Review */}
          <Textarea
            label="Review"
            placeholder="Enter review"
            name="review"
            value={formData.review}
            onChange={handleChange}
          />

          {/* Submit Button */}
          <Button type="submit" fullWidth className="bg-blue-600 mt-4">
            Submit
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default CreateDestinationModal;
