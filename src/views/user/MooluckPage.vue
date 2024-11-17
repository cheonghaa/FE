<template>
    <div :class="backgroundClass" class="weather-container">
      <p>현재 날씨: {{ weatherDescription }}</p>
    </div>
  </template>
  

  <script setup>
    import { ref, onMounted } from "vue";
    import axios from "axios";

    const weatherDescription = ref("");
    const backgroundClass = ref("");

    const fetchWeather = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          const response = await axios.get(
            `http://localhost:8080/api/weather?lat=${latitude}&lon=${longitude}`
          );
          console.log("API 응답 데이터:", response.data);

          const weatherIcon = response.data.response.data.weatherIcon; // API에서 반환한 weatherIcon
          weatherDescription.value = getWeatherDescription(weatherIcon);
          setBackground(weatherIcon);
        },
        (error) => {
          console.error("위치 권한 거부 또는 위치 가져오기 실패:", error.message);
        }
      );
      } catch (error) {
        console.error("날씨 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    const getWeatherDescription = (icon) => {
      const weatherMapping = {
        "01": "Clear",
        "02": "Clouds",
        "03": "Clouds",
        "04": "Broken Clouds",
        "09": "Rain",
        "10": "Rain",
        "11": "Rain",
        "13": "Snow",
        "50": "Mist",
      };
      const code = icon.slice(0, 2); // 아이콘의 숫자만 떼어내기, fetch할 때 weather의 icon으로 가져와서 ok
      return weatherMapping[code] || "Default";
    };

    const setBackground = (icon) => {
      const code = icon.slice(0, 2); // 마찬가지
      const dayNight = icon.endsWith("d") ? "D" : "N"; // 낮밤 구분
      const backgroundMapping = {
        "01": `clear${dayNight}`,
        "02": `clouds${dayNight}`,
        "03": `clouds${dayNight}`,
        "04": `brokenClouds${dayNight}`,
        "09": `rain${dayNight}`,
        "10": `rain${dayNight}`,
        "11": `rain${dayNight}`,
        "13": `snow${dayNight}`,
        "50": `mist${dayNight}`,
      };
      backgroundClass.value = backgroundMapping[code] || "default";
    };

    onMounted(() => {
      fetchWeather();
    });
  </script>
  
  <style scoped>
    .weather-container {
      width: 100%;
      height: 100vh;
      background-size: cover;
      background-position: center;
    }

    /* 모든 날씨 배경화면 - 낮밤 구분 */
    /* 전체 사진 임시 설정 */
    /* cloudsN, brokenCloudsD, brokenCloudsN, rainN, snowN, mistN 사진 임의로 */
    .clearD {
      background: url("@/assets/image/clearD_sample.webp") no-repeat center center;
    }
    .clearN {
      background: url("@/assets/image/clearN_sample.webp") no-repeat center center;
    }
    .cloudsD {
      background: url("@/assets/image/cloudsD_sample.webp") no-repeat center center;
    }
    .cloudsN { 
      background: url("@/assets/image/cloudsD_sample.webp") no-repeat center center;
    }
    .brokenCloudsD {
      background: url("@/assets/image/cloudsD_sample.webp") no-repeat center center;
    }
    .brokenCloudsN {
      background: url("@/assets/image/cloudsN_sample.webp") no-repeat center center;
    }
    .rainD {
      background: url("@/assets/image/rainD_sample.webp") no-repeat center center;
    }
    .rainN {
      background: url("@/assets/image/rainD_sample.webp") no-repeat center center;
    }
    .snowD {
      background: url("@/assets/image/snowD_sample.webp") no-repeat center center;
    }
    .snowN {
      background: url("@/assets/image/snowD_sample.jpeg") no-repeat center center;
    }
    .mistD {
      background: url("@/assets/image/mistD_sample.jpeg") no-repeat center center;
    }
    .mistN {
      background: url("@/assets/image/mistD_sample.webp") no-repeat center center;
    }
    .default {
      background: url("@/assets/image/clearD.webp") no-repeat center center;
    }
  </style>
  