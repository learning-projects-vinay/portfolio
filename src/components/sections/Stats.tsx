"use client";
import { Box, Container, Typography, Grid } from "@mui/material";
import { keyframes } from "@mui/system";
import { useEffect, useState, useRef } from "react";
import CodeIcon from "@mui/icons-material/Code";
import WorkIcon from "@mui/icons-material/Work";
import ApiIcon from "@mui/icons-material/Api";
import CloudIcon from "@mui/icons-material/Cloud";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
  delay: number;
}

const StatCard = ({
  icon,
  value,
  suffix = "",
  label,
  delay,
}: StatCardProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <Box
      ref={cardRef}
      sx={{
        textAlign: "center",
        p: 4,
        borderRadius: 4,
        background: (theme) =>
          theme.palette.mode === "light"
            ? "white"
            : "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)",
        border: (theme) =>
          theme.palette.mode === "light"
            ? "1px solid rgba(102,126,234,0.15)"
            : "1px solid rgba(255,255,255,0.1)",
        transition: "all 0.3s ease",
        animation: isVisible
          ? `${fadeInUp} 0.6s ease-out ${delay}s both`
          : "none",
        "&:hover": {
          transform: "translateY(-10px)",
          background: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(102,126,234,0.05)"
              : "rgba(255,255,255,0.08)",
          boxShadow: "0 20px 40px rgba(102,126,234,0.15)",
        },
      }}
    >
      <Box
        sx={{
          mb: 2,
          color: "#667eea",
          "& svg": { fontSize: 48 },
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          mb: 1,
          color: 'text.primary'
        }}
      >
        {count}
        {suffix}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          fontWeight: 500,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default function Stats() {
  return (
    <Box
      id="stats"
      sx={{
        py: 10,
        background: (theme) =>
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #ffffff 0%, #f5f7fa 100%)"
            : "linear-gradient(180deg, #141a3a 0%, #0a0e27 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            My Journey in Numbers
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Building quality software solutions and growing every day
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<WorkIcon />}
              value={2}
              suffix="+"
              label="Years Experience"
              delay={0}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<ApiIcon />}
              value={200}
              suffix="+"
              label="APIs Built"
              delay={0.1}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<CodeIcon />}
              value={10}
              suffix="+"
              label="Technologies"
              delay={0.2}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              icon={<CloudIcon />}
              value={50}
              suffix="+"
              label="Cloud Deployments"
              delay={0.3}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
