"use client";
import { useEffect, useRef } from "react";

interface MapViewerProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{ lat: number; lng: number; title?: string }>;
  className?: string;
}

export default function MapViewer({
  center = [73.8567, 18.5204],
  zoom = 10,
  markers = [],
  className = "h-[500px] w-full",
}: MapViewerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!token) {
      console.warn("Missing Mapbox token");
      return;
    }

    import("mapbox-gl").then((mapboxgl) => {
      mapboxgl.default.accessToken = token;
      const map = new mapboxgl.default.Map({
        container: mapRef.current!,
        style: "mapbox://styles/mapbox/streets-v12",
        center,
        zoom,
      });

      mapInstance.current = map;

      // Add default marker
      new mapboxgl.default.Marker({ color: "#6366f1" })
        .setLngLat(center)
        .addTo(map);

      // Add additional markers
      markers.forEach((m) => {
        const popup = new mapboxgl.default.Popup({ offset: 25 }).setText(m.title || "");
        new mapboxgl.default.Marker()
          .setLngLat([m.lng, m.lat])
          .setPopup(popup)
          .addTo(map);
      });

      map.addControl(new mapboxgl.default.NavigationControl(), "top-right");
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div className={`${className} rounded-2xl overflow-hidden relative`}>
      <div ref={mapRef} className="w-full h-full" />
      {!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 rounded-2xl">
          <div className="text-center">
            <p className="text-slate-500 font-medium">Map Preview</p>
            <p className="text-xs text-slate-400 mt-1">Add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to enable maps</p>
          </div>
        </div>
      )}
    </div>
  );
}
