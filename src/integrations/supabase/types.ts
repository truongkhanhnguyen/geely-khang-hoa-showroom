export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      car_details: {
        Row: {
          car_model: string
          created_at: string
          cta_section: Json | null
          description: string
          detailed_features: Json | null
          detailed_features_data: Json | null
          features: string[]
          gallery_images: string[] | null
          hero_image_url: string | null
          hero_mobile_image_url: string | null
          id: string
          is_active: boolean | null
          name: string
          priority: number | null
          specifications: Json | null
          specifications_data: Json | null
          tagline: string
          updated_at: string
        }
        Insert: {
          car_model: string
          created_at?: string
          cta_section?: Json | null
          description: string
          detailed_features?: Json | null
          detailed_features_data?: Json | null
          features?: string[]
          gallery_images?: string[] | null
          hero_image_url?: string | null
          hero_mobile_image_url?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          priority?: number | null
          specifications?: Json | null
          specifications_data?: Json | null
          tagline: string
          updated_at?: string
        }
        Update: {
          car_model?: string
          created_at?: string
          cta_section?: Json | null
          description?: string
          detailed_features?: Json | null
          detailed_features_data?: Json | null
          features?: string[]
          gallery_images?: string[] | null
          hero_image_url?: string | null
          hero_mobile_image_url?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          priority?: number | null
          specifications?: Json | null
          specifications_data?: Json | null
          tagline?: string
          updated_at?: string
        }
        Relationships: []
      }
      car_page_images: {
        Row: {
          car_model: string
          created_at: string
          display_order: number
          display_section: string
          id: string
          image_id: string | null
          is_active: boolean
          updated_at: string
        }
        Insert: {
          car_model: string
          created_at?: string
          display_order?: number
          display_section: string
          id?: string
          image_id?: string | null
          is_active?: boolean
          updated_at?: string
        }
        Update: {
          car_model?: string
          created_at?: string
          display_order?: number
          display_section?: string
          id?: string
          image_id?: string | null
          is_active?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "car_page_images_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "website_images"
            referencedColumns: ["id"]
          },
        ]
      }
      car_prices: {
        Row: {
          base_price: number
          car_model: string
          created_at: string
          id: string
          price_available: boolean
          promotion: number
          updated_at: string
          variant: string
        }
        Insert: {
          base_price: number
          car_model: string
          created_at?: string
          id?: string
          price_available?: boolean
          promotion?: number
          updated_at?: string
          variant: string
        }
        Update: {
          base_price?: number
          car_model?: string
          created_at?: string
          id?: string
          price_available?: boolean
          promotion?: number
          updated_at?: string
          variant?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          category: string
          content: string | null
          created_at: string
          date: string
          excerpt: string | null
          id: string
          image_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          content?: string | null
          created_at?: string
          date?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string | null
          created_at?: string
          date?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      promotions: {
        Row: {
          created_at: string
          description: string | null
          discount_amount: number | null
          id: string
          image_url: string | null
          title: string
          updated_at: string
          valid_until: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          discount_amount?: number | null
          id?: string
          image_url?: string | null
          title: string
          updated_at?: string
          valid_until?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          discount_amount?: number | null
          id?: string
          image_url?: string | null
          title?: string
          updated_at?: string
          valid_until?: string | null
        }
        Relationships: []
      }
      registration_fees: {
        Row: {
          created_at: string
          id: string
          inspection_premium: number
          inspection_standard: number
          insurance: number
          license_plate: number
          road_fee: number
          service_fee: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          inspection_premium?: number
          inspection_standard?: number
          insurance?: number
          license_plate?: number
          road_fee?: number
          service_fee?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          inspection_premium?: number
          inspection_standard?: number
          insurance?: number
          license_plate?: number
          road_fee?: number
          service_fee?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      website_images: {
        Row: {
          category: string
          created_at: string
          description: string | null
          file_name: string | null
          file_size: number | null
          id: string
          mobile_url: string | null
          name: string
          recommended_size: string
          url: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          file_name?: string | null
          file_size?: number | null
          id?: string
          mobile_url?: string | null
          name: string
          recommended_size: string
          url: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          file_name?: string | null
          file_size?: number | null
          id?: string
          mobile_url?: string | null
          name?: string
          recommended_size?: string
          url?: string
        }
        Relationships: []
      }
      website_seo_settings: {
        Row: {
          bing_site_verification: string | null
          canonical_url: string
          created_at: string | null
          custom_meta_tags: Json | null
          geo_placename: string
          geo_position: string
          geo_region: string
          google_site_verification: string | null
          hreflang_tags: Json | null
          id: string
          meta_charset: string
          meta_viewport: string
          og_description: string
          og_image: string
          og_locale: string
          og_site_name: string
          og_title: string
          og_type: string
          robots_follow: boolean | null
          robots_index: boolean | null
          robots_noarchive: boolean | null
          robots_nosnippet: boolean | null
          schema_address: Json | null
          schema_description: string
          schema_logo: string
          schema_name: string
          schema_offers: Json | null
          schema_services: Json | null
          schema_type: string
          schema_url: string
          site_author: string
          site_description: string
          site_keywords: string
          site_title: string
          sitemap_changefreq: string
          sitemap_priority: string
          twitter_card: string
          twitter_description: string
          twitter_image: string
          twitter_site: string | null
          twitter_title: string
          updated_at: string | null
          yandex_verification: string | null
        }
        Insert: {
          bing_site_verification?: string | null
          canonical_url?: string
          created_at?: string | null
          custom_meta_tags?: Json | null
          geo_placename?: string
          geo_position?: string
          geo_region?: string
          google_site_verification?: string | null
          hreflang_tags?: Json | null
          id?: string
          meta_charset?: string
          meta_viewport?: string
          og_description?: string
          og_image?: string
          og_locale?: string
          og_site_name?: string
          og_title?: string
          og_type?: string
          robots_follow?: boolean | null
          robots_index?: boolean | null
          robots_noarchive?: boolean | null
          robots_nosnippet?: boolean | null
          schema_address?: Json | null
          schema_description?: string
          schema_logo?: string
          schema_name?: string
          schema_offers?: Json | null
          schema_services?: Json | null
          schema_type?: string
          schema_url?: string
          site_author?: string
          site_description?: string
          site_keywords?: string
          site_title?: string
          sitemap_changefreq?: string
          sitemap_priority?: string
          twitter_card?: string
          twitter_description?: string
          twitter_image?: string
          twitter_site?: string | null
          twitter_title?: string
          updated_at?: string | null
          yandex_verification?: string | null
        }
        Update: {
          bing_site_verification?: string | null
          canonical_url?: string
          created_at?: string | null
          custom_meta_tags?: Json | null
          geo_placename?: string
          geo_position?: string
          geo_region?: string
          google_site_verification?: string | null
          hreflang_tags?: Json | null
          id?: string
          meta_charset?: string
          meta_viewport?: string
          og_description?: string
          og_image?: string
          og_locale?: string
          og_site_name?: string
          og_title?: string
          og_type?: string
          robots_follow?: boolean | null
          robots_index?: boolean | null
          robots_noarchive?: boolean | null
          robots_nosnippet?: boolean | null
          schema_address?: Json | null
          schema_description?: string
          schema_logo?: string
          schema_name?: string
          schema_offers?: Json | null
          schema_services?: Json | null
          schema_type?: string
          schema_url?: string
          site_author?: string
          site_description?: string
          site_keywords?: string
          site_title?: string
          sitemap_changefreq?: string
          sitemap_priority?: string
          twitter_card?: string
          twitter_description?: string
          twitter_image?: string
          twitter_site?: string | null
          twitter_title?: string
          updated_at?: string | null
          yandex_verification?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
