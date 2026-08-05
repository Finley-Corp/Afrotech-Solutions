"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AddToQuoteButton from "../../components/AddToQuoteButton";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import type { ProductDbRow } from "@/app/data/products";
import type { ProductListItem } from "@/lib/products-db";
import { productDetailPath } from "@/lib/product-slug";
import { SPECS_UNAVAILABLE_MESSAGE } from "@/lib/product-metadata";

const BRAND_COLOR: Record<string, string> = {
  grundfos: "#00526E",
  ksb: "#C8102E",
  wilo: "#002D62",
};
const BRAND_BG: Record<string, string> = {
  grundfos: "#E6F3F6",
  ksb: "#FCE9EC",
  wilo: "#E6EBF4",
};

type Props = {
  product: ProductDbRow;
  similarProducts: ProductListItem[];
};

export default function ProductDetailView({ product, similarProducts }: Props) {
  const [imgError, setImgError] = useState(false);

  const brandKey = product.category_id?.toLowerCase() ?? "";
  const brandColor = BRAND_COLOR[brandKey] ?? "#003366";
  const brandBg = BRAND_BG[brandKey] ?? "#E8EDF5";
  const specs = product.detailed_specs ?? [];
  const applications = product.applications ?? [];

  return (
    <main className="pd-page">
      <Navbar />

      <div className="pd-breadcrumb">
        <div className="pd-breadcrumb__inner">
          <Link href="/products" className="pd-breadcrumb__link">
            <Icon icon="solar:arrow-left-linear" width={14} />
            Back to Catalogue
          </Link>
          <span className="pd-breadcrumb__sep">/</span>
          <span className="pd-breadcrumb__badge" style={{ color: brandColor, background: brandBg }}>
            {product.category}
          </span>
          <span className="pd-breadcrumb__sep">/</span>
          <span className="pd-breadcrumb__current">{product.name}</span>
        </div>
      </div>

      <section className="pd-hero">
        <div className="pd-hero__inner">
          <div className="pd-hero__media">
            <div className="pd-hero__img-frame">
              {!imgError ? (
                <Image
                  src={product.main_img}
                  alt={product.name}
                  className="pd-hero__img"
                  width={800}
                  height={600}
                  sizes="(max-width: 900px) 100vw, 50vw"
                  priority
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="pd-hero__img-fallback">
                  <Icon icon="solar:box-minimalistic-linear" width={48} />
                  <span>No image available</span>
                </div>
              )}
            </div>

            <div className="pd-hero__brand-pill" style={{ color: brandColor, background: brandBg }}>
              {product.category}
            </div>
          </div>

          <div className="pd-hero__info">
            <div className="pd-hero__eyebrow">
              <span className="pd-hero__dot" style={{ background: brandColor }} />
              {product.category} · Industrial Pump
            </div>

            <h1 className="pd-hero__title">{product.name}</h1>
            <p className="pd-hero__desc">{product.full_desc}</p>

            {specs.length > 0 && (
              <div className="pd-hero__spec-pills">
                {specs.slice(0, 4).map((s) => (
                  <div key={`${s.label}-${s.value}`} className="pd-hero__spec-pill">
                    <span className="pd-hero__spec-label">{s.label}</span>
                    <span className="pd-hero__spec-value">{s.value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pd-hero__actions">
              <AddToQuoteButton
                id={product.id}
                slug={product.slug}
                name={product.name}
                brand={product.category}
                variant="detail"
              />
              <Link
                href={{ pathname: "/quote", query: { model: product.slug } }}
                className="pd-hero__cta-primary"
              >
                <Icon icon="solar:document-text-linear" width={16} />
                Request a Quote
              </Link>
              <Link href="/products" className="pd-hero__cta-secondary">
                <Icon icon="solar:catalog-linear" width={16} />
                Browse Catalogue
              </Link>
            </div>

            <div className="pd-hero__trust">
              <div className="pd-hero__trust-item">
                <Icon icon="solar:shield-check-linear" width={15} />
                Quality Guaranteed
              </div>
              <div className="pd-hero__trust-item">
                <Icon icon="solar:delivery-linear" width={15} />
                EA-wide Delivery
              </div>
              <div className="pd-hero__trust-item">
                <Icon icon="solar:headphones-round-sound-linear" width={15} />
                Expert Support
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pd-details">
        <div className="pd-details__inner">
          <div className="pd-details__col">
            <div className="pd-details__section-head">
              <span className="pd-details__section-eyebrow">
                <Icon icon="solar:settings-linear" width={13} />
                Specifications
              </span>
              <h2 className="pd-details__section-title">Technical Data</h2>
            </div>

            {specs.length > 0 ? (
              <div className="pd-specs-table">
                {specs.map((s) => (
                  <div key={`${s.label}-${s.value}`} className="pd-specs-table__row">
                    <span className="pd-specs-table__label">{s.label}</span>
                    <span className="pd-specs-table__value">{s.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="pd-specs-empty">
                <Icon icon="solar:document-broken" width={28} />
                <p>{SPECS_UNAVAILABLE_MESSAGE}</p>
              </div>
            )}
          </div>

          <div className="pd-details__col">
            <div className="pd-details__section-head">
              <span className="pd-details__section-eyebrow">
                <Icon icon="solar:target-linear" width={13} />
                Use Cases
              </span>
              <h2 className="pd-details__section-title">Applications</h2>
            </div>

            <div className="pd-applications">
              {applications.map((app) => (
                <div key={app} className="pd-applications__item">
                  <span className="pd-applications__icon" style={{ background: brandBg, color: brandColor }}>
                    <Icon icon="solar:check-circle-linear" width={16} />
                  </span>
                  <span className="pd-applications__label">{app}</span>
                </div>
              ))}
            </div>

            <div className="pd-quality-card">
              <div className="pd-quality-card__header">
                <Icon icon="solar:medal-ribbons-star-linear" width={20} className="pd-quality-card__icon" />
                <span className="pd-quality-card__title">Reliability Standards</span>
              </div>
              <p className="pd-quality-card__text">
                All components in the <strong>{product.name}</strong> series undergo rigorous quality testing
                including high-pressure endurance and motor winding integrity checks — ensuring long-term
                performance in demanding environments.
              </p>
              <Link
                href={{ pathname: "/quote", query: { model: product.slug } }}
                className="pd-quality-card__cta"
              >
                Inquire About This Model
                <Icon icon="solar:arrow-right-linear" width={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {similarProducts.length > 0 && (
        <section className="pd-similar">
          <div className="pd-similar__inner">
            <h2 className="pd-similar__title">Similar products</h2>
            <div className="pd-similar__grid">
              {similarProducts.map((p) => (
                <Link key={p.id} href={productDetailPath(p.slug)} className="pd-similar__card">
                  <div className="pd-similar__media">
                    <Image
                      src={p.main_img}
                      alt={p.name}
                      width={320}
                      height={240}
                      className="pd-similar__img"
                    />
                  </div>
                  <div className="pd-similar__body">
                    <span className="pd-similar__brand">{p.category}</span>
                    <span className="pd-similar__name">{p.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="pd-bottom-nav">
        <div className="pd-bottom-nav__inner">
          <Link href="/products" className="pd-bottom-nav__back">
            <Icon icon="solar:arrow-left-linear" width={16} />
            Back to Catalogue
          </Link>
          <Link
            href={{ pathname: "/quote", query: { model: product.slug } }}
            className="pd-bottom-nav__quote"
          >
            Request a Quote
            <Icon icon="solar:arrow-right-linear" width={16} />
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
