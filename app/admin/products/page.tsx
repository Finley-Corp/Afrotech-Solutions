"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Icon } from "@iconify/react";
import { productsList } from "../../data/products";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [migrating, setMigrating] = useState(false);
  
  // Editor State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  }

  async function handleMigrate() {
    if (!confirm("Are you sure you want to migrate static products to Supabase?")) return;
    setMigrating(true);

    const productsToInsert = productsList.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      category_id: p.categoryId,
      short_desc: p.shortDesc,
      full_desc: p.fullDesc,
      price: p.price,
      main_img: p.mainImg,
      specs: p.specs,
      detailed_specs: p.detailedSpecs,
      applications: p.applications
    }));

    const { error } = await supabase
      .from("products")
      .insert(productsToInsert);

    if (error) {
      alert("Migration failed: " + error.message);
    } else {
      alert("Migration successful!");
      fetchProducts();
    }
    setMigrating(true); // Disable migration button after first run
  }

  const openEditor = (product: any = null) => {
    setEditingProduct(product || {
      id: "",
      name: "",
      category: "Submersible Pumps",
      category_id: "submersible",
      short_desc: "",
      full_desc: "",
      price: "",
      main_img: "",
      specs: [],
      detailed_specs: [],
      applications: []
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from("products")
      .upsert(editingProduct);

    if (error) {
      alert("Error saving product: " + error.message);
    } else {
      setIsModalOpen(false);
      fetchProducts();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;
    
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Error deleting product: " + error.message);
    } else {
      fetchProducts();
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "5rem" }}>
        <Icon icon="lucide:loader-2" className="animate-spin" width="24" />
      </div>
    );
  }

  return (
    <div>
      <header style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "var(--color-primary)", marginBottom: "0.5rem" }}>
            Product Catalog.
          </h1>
          <p style={{ color: "#6B7280", fontSize: "0.875rem", fontWeight: 300 }}>
            Manage the hardware inventory displayed on the public site.
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
           {products.length === 0 && (
            <button 
              onClick={handleMigrate}
              disabled={migrating}
              style={{ 
                padding: "0.75rem 1.5rem", 
                backgroundColor: "#F3F4F6", 
                color: "var(--color-primary)", 
                border: "none", 
                borderRadius: "2px",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontWeight: 600,
                cursor: "pointer",
                opacity: migrating ? 0.5 : 1
              }}
            >
              Populate Initial Data
            </button>
          )}
          <button 
            onClick={() => openEditor()}
            style={{ 
              padding: "0.75rem 1.5rem", 
              backgroundColor: "var(--color-accent)", 
              color: "white", 
              border: "none", 
              borderRadius: "2px",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            <Icon icon="lucide:plus" />
            Add New Product
          </button>
        </div>
      </header>

      <div style={{ 
        backgroundColor: "white", 
        border: "1px solid var(--color-line)", 
        borderRadius: "2px",
        overflow: "hidden"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ backgroundColor: "#F9FAFB", borderBottom: "1px solid var(--color-line)" }}>
            <tr>
              <th style={thStyle}>Preview</th>
              <th style={thStyle}>Product Name</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "3rem", textAlign: "center", color: "#6B7280", fontSize: "0.875rem" }}>
                  No products in database. Please run migration or add a new product.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid var(--color-line)" }}>
                  <td style={tdStyle}>
                    <img src={p.main_img} alt="" style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "2px" }} />
                  </td>
                  <td style={tdStyle}>{p.name}</td>
                  <td style={tdStyle}>{p.category}</td>
                  <td style={tdStyle}>{p.price}</td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <button 
                         onClick={() => openEditor(p)}
                        style={{ 
                          background: "none", 
                          border: "none", 
                          color: "var(--color-primary)", 
                          cursor: "pointer",
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          fontWeight: 600,
                        }}
                      >
                        Edit
                      </button>
                      <button 
                         onClick={() => handleDelete(p.id)}
                        style={{ 
                          background: "none", 
                          border: "none", 
                          color: "#EF4444", 
                          cursor: "pointer",
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          fontWeight: 600,
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem"
        }}>
          <div style={{
            backgroundColor: "white",
            width: "100%",
            maxWidth: "800px",
            maxHeight: "90vh",
            overflow: "auto",
            borderRadius: "2px",
            position: "relative"
          }}>
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{ position: "absolute", top: "1.5rem", right: "1.5rem", border: "none", background: "none", cursor: "pointer" }}
            >
              <Icon icon="lucide:x" width="24" />
            </button>
            <form onSubmit={handleSave} style={{ padding: "3rem" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", marginBottom: "2rem" }}>
                {editingProduct?.created_at ? "Edit Product" : "New Product"}
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                <div>
                  <label style={labelStyle}>Product ID (Slug)</label>
                  <input 
                    type="text" 
                    value={editingProduct.id}
                    onChange={(e) => setEditingProduct({...editingProduct, id: e.target.value.toLowerCase().replace(/ /g, '-')})}
                    required
                    style={inputStyle}
                    placeholder="aquamax-3000"
                    disabled={!!editingProduct?.created_at}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Product Name</label>
                  <input 
                    type="text" 
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                    required
                    style={inputStyle}
                    placeholder="AquaMax 3000"
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                <div>
                  <label style={labelStyle}>Category</label>
                  <select 
                    value={editingProduct.category}
                    onChange={(e) => {
                      const catId = e.target.value.toLowerCase().includes('solar') ? 'solar' : 
                                   e.target.value.toLowerCase().includes('industrial') ? 'industrial' : 'submersible';
                      setEditingProduct({...editingProduct, category: e.target.value, category_id: catId});
                    }}
                    style={inputStyle}
                  >
                    <option>Submersible Pumps</option>
                    <option>Solar Pumping Systems</option>
                    <option>Industrial Centrifugal</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Price</label>
                  <input 
                    type="text" 
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                    required
                    style={inputStyle}
                    placeholder="From $850"
                  />
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={labelStyle}>Short Description</label>
                <input 
                  type="text" 
                  value={editingProduct.short_desc}
                  onChange={(e) => setEditingProduct({...editingProduct, short_desc: e.target.value})}
                  required
                  style={inputStyle}
                  placeholder="Industrial-grade borehole pump..."
                />
              </div>

              <div style={{ marginBottom: "2.5rem" }}>
                <label style={labelStyle}>Full Description</label>
                <textarea 
                  value={editingProduct.full_desc}
                  onChange={(e) => setEditingProduct({...editingProduct, full_desc: e.target.value})}
                  required
                  rows={4}
                  style={{ ...inputStyle, resize: "none" }}
                  placeholder="Engineered for high-volume extraction..."
                />
              </div>

              <div style={{ marginBottom: "2.5rem" }}>
                <label style={labelStyle}>Main Image URL</label>
                <input 
                  type="text" 
                  value={editingProduct.main_img}
                  onChange={(e) => setEditingProduct({...editingProduct, main_img: e.target.value})}
                  required
                  style={inputStyle}
                  placeholder="https://..."
                />
              </div>

              {/* JSON FIELDS */}
              <div style={jsonGridStyle}>
                <div>
                  <label style={labelStyle}>Key Specs (One per line)</label>
                  <textarea 
                    value={editingProduct.specs.join('\n')}
                    onChange={(e) => setEditingProduct({...editingProduct, specs: e.target.value.split('\n')})}
                    rows={4}
                    style={jsonInputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Applications (One per line)</label>
                  <textarea 
                    value={editingProduct.applications.join('\n')}
                    onChange={(e) => setEditingProduct({...editingProduct, applications: e.target.value.split('\n')})}
                    rows={4}
                    style={jsonInputStyle}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", marginTop: "3rem" }}>
                <button 
                  type="submit"
                  disabled={saving}
                  style={{ 
                    flex: 1, 
                    padding: "1rem", 
                    backgroundColor: "var(--color-primary)", 
                    color: "white", 
                    border: "none", 
                    borderRadius: "2px",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontWeight: 600,
                    opacity: saving ? 0.7 : 1
                  }}
                >
                  {saving ? "Saving Changes..." : "Save Product"}
                </button>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ 
                    padding: "1rem 2rem", 
                    backgroundColor: "white", 
                    color: "var(--color-primary)", 
                    border: "1px solid var(--color-line)", 
                    borderRadius: "2px",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontWeight: 600
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: "1.25rem 1.5rem",
  fontSize: "0.625rem",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "#6B7280",
  fontWeight: 600,
};

const tdStyle: React.CSSProperties = {
  padding: "1.25rem 1.5rem",
  fontSize: "0.875rem",
  color: "var(--color-primary)",
  fontWeight: 300,
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.625rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "#6B7280",
  marginBottom: "0.75rem",
  fontWeight: 500
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 0",
  border: "none",
  borderBottom: "1px solid var(--color-line)",
  fontSize: "0.9375rem",
  color: "var(--color-primary)",
  outline: "none",
  transition: "border-color 0.2s"
};

const jsonGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "2rem"
};

const jsonInputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.5rem",
  border: "1px solid var(--color-line)",
  borderRadius: "2px",
  fontSize: "0.875rem",
  fontFamily: "monospace",
  resize: "none"
};
