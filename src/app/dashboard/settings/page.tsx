"use client";

import { useEffect, useState } from "react";
import { Save, Loader2 } from "lucide-react";
import {
  Button,
  Card,
  Input,
  Label,
  Switch,
  Separator,
  Textarea,
  PageTitle,
} from "@/components";
import { toast } from "sonner";
import { useAuthAxios } from "@/config/auth-axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "@/config/routes";
import { TSettingResponse } from "./types";
import { updateSettingSchema } from "./validator";
import { KEYS } from "@/config/constants";
import { z } from "zod";
import { AxiosError } from "axios";

type FormData = z.infer<typeof updateSettingSchema>;

export default function Settings() {
  const { _axios } = useAuthAxios();

  // Form setup
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(updateSettingSchema),
  });

  // State for initial load
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Fetch settings
  const {
    data: settingResponse,
    isError,
    isSuccess,
    refetch,
  } = useQuery<TSettingResponse>({
    queryKey: KEYS.SETTINGS.GET,
    queryFn: getSettings,
  });

  // Handle side effects after fetching
  useEffect(() => {
    if (isSuccess && settingResponse?.setting) {
      const { setting } = settingResponse;
      setValue("description", setting.description);
      setValue("phone", setting.phone);
      setValue("address", setting.address);
      setValue("email", setting.email);
      setValue("openingHours", setting.openingHours);
      setValue("facebookUrl", setting.facebookUrl);
      setValue("instagramUrl", setting.instagramUrl);
      setValue("twitterUrl", setting.twitterUrl);
      setValue("enableReservation", setting.enableReservation);
      setValue("showReviews", setting.showReviews);
      setIsInitialLoading(false);
    }
    if (isError) {
      toast.error("Failed to fetch settings");
      setIsInitialLoading(false);
    }
  }, [isSuccess, isError, settingResponse, setValue]);

  // Update settings mutation
  const { mutateAsync: updateSettingMutateAsync, isPending: updatePending } =
    useMutation({
      mutationKey: KEYS.SETTINGS.UPDATE,
      mutationFn: updateSetting,
      onSuccess: () => {
        refetch();
        toast.success("Settings updated successfully");
      },
      onError: () => {
        toast.error("Failed to update settings");
      },
    });

  // API handlers
  async function getSettings() {
    try {
      const response = await _axios.get<TSettingResponse>(API_ROUTES.SETTINGS);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const errorMessage =
        err.response?.data?.message ?? "Failed to fetch settings";
      throw new Error(errorMessage);
    }
  }

  async function updateSetting(data: FormData) {
    try {
      // Clean up social media URLs - convert empty strings to null
      const cleanedData = {
        ...data,
        facebookUrl: data.facebookUrl || null,
        instagramUrl: data.instagramUrl || null,
        twitterUrl: data.twitterUrl || null,
      };

      const response = await _axios.patch<TSettingResponse>(
        API_ROUTES.SETTINGS,
        cleanedData
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const errorMessage =
        err.response?.data?.message ?? "Failed to update settings";
      throw new Error(errorMessage);
    }
  }

  // Form submission handler
  async function handleSubmitForm(data: FormData) {
    try {
      await updateSettingMutateAsync(data);
    } catch (error) {
      // Handle specific validation errors if they exist
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        Object.keys(validationErrors).forEach((field) => {
          toast.error(`${field}: ${validationErrors[field]}`);
        });
      } else {
        toast.error(error.message ?? "Failed to update settings");
      }
    }
  }

  return (
    <div>
      <PageTitle
        title="Restaurant Settings"
        description="Manage your restaurant information and preferences"
      />
      {isInitialLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    className="mt-1 h-24"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    {...register("address")}
                    className="mt-1"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" {...register("phone")} className="mt-1" />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="mt-1"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="openingHours">Opening Hours</Label>
                  <Textarea
                    id="openingHours"
                    {...register("openingHours")}
                    className="mt-1 h-24"
                  />
                  {errors.openingHours && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.openingHours.message}
                    </p>
                  )}
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Social Media</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="facebookUrl">Facebook</Label>
                  <Input
                    id="facebookUrl"
                    {...register("facebookUrl")}
                    className="mt-1"
                  />
                  {errors.facebookUrl && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.facebookUrl.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="instagramUrl">Instagram</Label>
                  <Input
                    id="instagramUrl"
                    {...register("instagramUrl")}
                    className="mt-1"
                  />
                  {errors.instagramUrl && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.instagramUrl.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="twitterUrl">Twitter</Label>
                  <Input
                    id="twitterUrl"
                    {...register("twitterUrl")}
                    className="mt-1"
                  />
                  {errors.twitterUrl && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.twitterUrl.message}
                    </p>
                  )}
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Features</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableReservation">
                    Enable Online Reservations
                  </Label>
                  <Switch
                    id="enableReservation"
                    checked={settingResponse?.setting?.enableReservation}
                    onCheckedChange={(checked) =>
                      setValue("enableReservation", checked)
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="showReviews">Show Customer Reviews</Label>
                  <Switch
                    id="showReviews"
                    checked={settingResponse?.setting?.showReviews}
                    onCheckedChange={(checked) =>
                      setValue("showReviews", checked)
                    }
                  />
                </div>
              </div>
            </Card>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="btn-gold"
                disabled={updatePending}
              >
                {updatePending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save size={16} className="mr-2" />
                )}
                {updatePending ? "Saving..." : "Save Settings"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
