import {
  Box,
  Typography,
  Divider,
  Avatar,
  Stack,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StarIcon from "@mui/icons-material/Star";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { CustomerDashboardStats } from "../../../../services/response/customer.response";
import CustomerService from "../../../../services/customer.service";

const StatItem = ({
  label,
  value,
  color = "primary.main",
  icon,
}: {
  label: string;
  value: string | number;
  color?: string;
  icon?: React.ReactNode;
}) => (
  <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
    {icon && <Box sx={{ mr: 1.5, color }}>{icon}</Box>}
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h6" sx={{ color, fontWeight: 500 }}>
        {value}
      </Typography>
    </Box>
  </Box>
);

const CustomerStatsDashboard = () => {
  const [stats, setStats] = useState<CustomerDashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await CustomerService.getDashboardStats();
        setStats(response);
      } catch (error) {
        console.error("Lỗi khi lấy thống kê khách hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    // Cập nhật thống kê mỗi 5 phút
    const intervalId = setInterval(fetchStats, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Đang tải thống kê...
        </Typography>
        <LinearProgress />
      </Box>
    );
  }

  if (!stats) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <PersonOffIcon sx={{ fontSize: 40, color: "text.secondary", mb: 1 }} />
        <Typography>Không có dữ liệu thống kê</Typography>
      </Box>
    );
  }

  const {
    totalCustomers,
    activeCustomers,
    inactiveCustomers,
    newCustomersThisMonth,
    topSpender,
  } = stats;
  const activePercentage =
    totalCustomers > 0
      ? Math.round((activeCustomers / totalCustomers) * 100)
      : 0;

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <PeopleAltIcon sx={{ mr: 1, color: "primary.main" }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Thống kê khách hàng
        </Typography>
      </Box>

      <StatItem
        label="Tổng số khách hàng"
        value={totalCustomers.toLocaleString()}
        color="primary.main"
        icon={<PeopleAltIcon />}
      />

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PersonIcon sx={{ fontSize: 20, color: "success.main", mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              Đang hoạt động
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{ color: "success.main", fontWeight: 500 }}
          >
            {activeCustomers.toLocaleString()} ({activePercentage}%)
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PersonOffIcon
              sx={{ fontSize: 20, color: "error.main", mr: 0.5 }}
            />
            <Typography variant="body2" color="text.secondary">
              Không hoạt động
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{ color: "error.main", fontWeight: 500 }}
          >
            {inactiveCustomers.toLocaleString()}
          </Typography>
        </Box>

        <Tooltip
          title={`${activePercentage}% khách hàng đang hoạt động`}
          arrow
          placement="top"
        >
          <LinearProgress
            variant="determinate"
            value={activePercentage}
            sx={{
              height: 8,
              borderRadius: 1,
              backgroundColor: "error.light",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "success.main",
              },
            }}
          />
        </Tooltip>
      </Box>

      <StatItem
        label="Khách hàng mới trong tháng"
        value={newCustomersThisMonth.toLocaleString()}
        color="info.main"
        icon={<TrendingUpIcon />}
      />

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <StarIcon sx={{ mr: 1, color: "warning.main", fontSize: 20 }} />
        <Typography variant="subtitle2">
          Khách hàng chi tiêu nhiều nhất
        </Typography>
      </Box>

      {topSpender && (
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 1.5,
            borderRadius: 1,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Avatar
              sx={{
                bgcolor: "secondary.main",
                width: 48,
                height: 48,
                fontSize: 20,
              }}
            >
              {topSpender.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {topSpender.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <MonetizationOnIcon
                  sx={{ fontSize: 16, color: "success.main", mr: 0.5 }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: "success.main", fontWeight: 500 }}
                >
                  {topSpender.totalSpent}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Box>
      )}

      {/* Mini chart - có thể thêm ở đây */}
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontStyle: "italic" }}
        >
          Cập nhật lúc: {new Date().toLocaleTimeString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomerStatsDashboard;
