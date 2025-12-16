import type { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";
import { ArrowRight, Loader2 } from "lucide-react";

const DemoForm = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { trackEvent, trackConversion } = useGoogleAnalytics();

  const formSchema = z.object({
    firstName: z
      .string()
      .min(1, { message: t("demo.form.errors.firstNameRequired") })
      .max(50, { message: t("demo.form.errors.firstNameMax") })
      .trim(),
    lastName: z
      .string()
      .min(1, { message: t("demo.form.errors.lastNameRequired") })
      .max(50, { message: t("demo.form.errors.lastNameMax") })
      .trim(),
    email: z
      .string()
      .min(1, { message: t("demo.form.errors.emailRequired") })
      .email({ message: t("demo.form.errors.emailInvalid") })
      .max(100, { message: t("demo.form.errors.emailMax") })
      .trim()
      .toLowerCase(),
    company: z
      .string()
      .min(1, { message: t("demo.form.errors.companyRequired") })
      .max(100, { message: t("demo.form.errors.companyMax") })
      .trim(),
    locations: z
      .string()
      .min(1, { message: t("demo.form.errors.locationsRequired") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      locations: "",
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;

    const submitHandler = form.handleSubmit((_, event) => {
      trackEvent("form_submit_attempt", {
        form_name: "demo_request",
      });

      const currentForm = (event?.currentTarget as HTMLFormElement | null) ?? formElement;
      const data = new FormData(currentForm);

      const firstName = String(data.get("firstName") ?? "");
      const lastName = String(data.get("lastName") ?? "");
      const email = String(data.get("email") ?? "");
      const company = String(data.get("company") ?? "");
      const locations = String(data.get("locations") ?? "");

      const subject = encodeURIComponent("Nova solicitação de demonstração - Loyaltify");
      const body = encodeURIComponent(
        [
          `${t("demo.form.firstName")}: ${firstName}`,
          `${t("demo.form.lastName")}: ${lastName}`,
          `${t("demo.form.workEmail")}: ${email}`,
          `${t("demo.form.company")}: ${company}`,
          `${t("demo.form.locations")}: ${locations}`,
        ].join("\n"),
      );

      const mailtoLink = `mailto:info@loyaltify.ca?subject=${subject}&body=${body}`;

      trackEvent("generate_lead", {
        currency: "CAD",
        value: 1000,
      });

      trackConversion("demo_form_submission");

      toast({
        title: t("demo.form.success.title"),
        description: t("demo.form.success.description"),
      });

      form.reset();
      window.location.href = mailtoLink;
    });

    return submitHandler(e);
  };

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{t("demo.form.title")}</h2>
        <p className="text-sm text-muted-foreground">
          {t("demo.form.subtitle")}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("demo.form.firstName")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("demo.form.firstNamePlaceholder")}
                    className="bg-background/50 border-primary/20 focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("demo.form.lastName")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("demo.form.lastNamePlaceholder")}
                    className="bg-background/50 border-primary/20 focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Work Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("demo.form.workEmail")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t("demo.form.workEmailPlaceholder")}
                    className="bg-background/50 border-primary/20 focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company Name */}
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("demo.form.company")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("demo.form.companyPlaceholder")}
                    className="bg-background/50 border-primary/20 focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Number of Locations */}
          <FormField
            control={form.control}
            name="locations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("demo.form.locations")}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background/50 border-primary/20 focus:border-primary">
                      <SelectValue placeholder={t("demo.form.locationsPlaceholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2-5">2-5</SelectItem>
                    <SelectItem value="6-10">6-10</SelectItem>
                    <SelectItem value="11-50">11-50</SelectItem>
                    <SelectItem value="51+">51+</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all group"
            size="lg"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                {t("demo.form.submitting")}
              </>
            ) : (
              <>
                {t("demo.form.submit")}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>

          {/* Compliance Text */}
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            {t("demo.form.compliance")}
          </p>
        </form>
      </Form>
    </div>
  );
};

export default DemoForm;
