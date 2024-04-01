<template>
  <div id="product">
    <!-- Header Section -->
    <v-row class="mx-1 mx-md-10">
      <v-col cols="12" md="5" class="w-100">
        <img src="../assets/imgs/Social-icon/fb.svg" alt="Illustration" class="img" />
      </v-col>

      <v-col>
        <v-col>
          <h1 class="text-h4 mb-4 text-sm-h3 text-grey-darken-4">{{ headerText }}</h1>
        </v-col>

        <v-col>
          <p class="text-h6 text-justify text-grey-darken-2">
            At IMS, we believe that invoicing shouldn't be a headache. Our dedicated team of 9
            individuals is passionate about simplifying the invoicing process for businesses of all
            sizes. With sharp mind and keen intrest in software development and user experience
            design, we're committed to delivering a solution that empowers our users to focus more
            on their core operations.
          </p>
        </v-col>
      </v-col>
    </v-row>
    <v-row class="mx-1 mx-md-10">
      <v-col>
        <v-col>
          <p class="text-h4 mb-2">Our Vision for the Future</p>

          <p class="text-h6 text-justify text-grey-darken-2">
            Looking ahead, we are committed to continuously improving our platform and expanding our
            capabilities to meet the evolving needs of our users. Our vision is to become the go-to
            solution for businesses worldwide seeking a hassle-free invoicing experience.
          </p>
        </v-col>
        <v-col>
          <p class="text-h4 mb-2">Get Started Today</p>
          <p class="text-h6 text-justify text-grey-darken-2">
            Ready to experience the future of invoice management? Explore our website to learn more
            about our platform's features, or contact us directly for personalized assistance.
          </p>
          <br />
          <br />
          <p class="text-h6 text-justify text-grey-darken-2">
            IMS is owned by Argusoft India and build by our awesome team 👇
          </p>
        </v-col>
      </v-col>
    </v-row>

    <v-spacer></v-spacer>
    <!-- Team Section -->
    <hr class="mx-auto my-12" style="border: none; border-top: 7px dotted #112d4eaa; width: 15%" />
    <div id="team">
      <p class="text-h4 text-center font-weight-bold mb-5">Our Team</p>
      <v-row class="ma-0 ma-xs-6 mx-md-16 my-md-11">
        <v-col v-for="member in teamMembers" :key="member.id" cols="12" sm="6" md="4">
          <v-card color="justify-center align-center d-flex " flat>
            <div class="user-container">
              <img :src="member.photo" alt="Profile photo" class="user-img" />
            </div>
            <v-card-text class="text-start">
              <h3 class="text-h6 font-weight-bold" style="color: #112d4e">{{ member.name }}</h3>
              <p class="text-body-1">{{ member.role }}</p>
            </v-card-text>
          </v-card>
          <div class="social-icon">
            <!-- <a :href="member.instagram" target="_blank" flat>
                <img
                  class="social-icon-img"
                  src="../assets/imgs/Social-icon/icons8-instagram.svg"
                  alt="Profile Photo"
                />
              </a> -->
            <a :href="member.linkedin" target="_blank" flat>
              <img
                class="social-icon-img"
                src="../assets/imgs/Social-icon/icons8-linkedin.svg"
                alt="Profile Photo"
              />
            </a>
            <a :href="member.github" target="_blank" flat>
              <img
                class="social-icon-img"
                src="../assets/imgs/Social-icon/icons8-github.svg"
                alt="Profile Photo"
              />
            </a>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const headerText = ref('Welcome to IMS - Your Partner in Streamlined Invoicing!')

// Import image files
import Anant from '@/assets/imgs/User/1.png'
import Chandan from '@/assets/imgs/User/1.png'
import Ishant from '@/assets/imgs/User/3.png'
import Pratyush from '@/assets/imgs/User/7.png'
import Sujit from '@/assets/imgs/User/1.png'
import Sumit from '@/assets/imgs/User/4.png'
import Swayam from '@/assets/imgs/User/6.png'
import Ujwal from '@/assets/imgs/User/3.png'
import Vivek from '@/assets/imgs/User/user-1.jpg'

// Import more photo files as needed

// Array to store photo paths

const teamMembers = ref([
  {
    id: 1,
    name: 'Anant Patel',
    role: 'Programmer Analyst',
    photo: Anant,
    linkedin: 'https://www.linkedin.com/in/anant-patel-329307201',
    instagram: '',
    github: 'https://github.com/anantpatel2002'
  },
  {
    id: 2,
    name: 'Chandan Kumar',
    role: 'Programmer Analyst',
    photo: Chandan,
    linkedin: 'https://www.linkedin.com/in/anant-patel-329307201',
    instagram: 'https://www.linkedin.com/in/chandan-kumar-0ab518212/',
    github: 'https://github.com/iChandanKr '
  },
  {
    id: 3,
    name: 'Ishant Yadav',
    role: 'Programmer Analyst',
    photo: Ishant,
    linkedin: 'www.linkedin.com/in/ishant-yadav-55982b138',
    instagram: '',
    github: 'https://github.com/Ishant8'
  },
  {
    id: 4,
    name: 'Pratyush Padihary',
    role: 'Programmer Analyst',
    photo: Pratyush,
    linkedin:
      'https://www.linkedin.com/in/pratyush-padihary-3b83a91aa?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app  ',
    instagram: '',
    github: 'https://github.com/grayvoyager'
  },
  {
    id: 5,
    name: 'Sujit Pattanaik',
    role: 'Programmer Analyst',
    photo: Sujit,
    linkedin: 'https://www.linkedin.com/in/anant-patel-329307201',
    instagram: '',
    github: 'https://github.com/anantpatel2002'
  },
  {
    id: 6,
    name: 'Sumit Sharma',
    role: 'Programmer Analyst',
    photo: Sumit,
    linkedin: 'https://www.linkedin.com/in/sumitsharma17/',
    instagram: '',
    github: 'https://github.com/sumitsharma1726'
  },
  {
    id: 7,
    name: 'Swayam Khare',
    role: 'Programmer Analyst',
    photo: Swayam,
    linkedin: ' https://www.linkedin.com/in/swayam-khare-596968212/',
    instagram: 'https://www.instagram.com/swayam_khare/',
    github: 'https://github.com/Swayam-Khare/'
  },
  {
    id: 8,
    name: 'Ujwal Gupta',
    role: 'Programmer Analyst',
    photo: Ujwal,
    linkedin: 'https://www.linkedin.com/in/ujwal3020',
    instagram: 'https://www.instagram.com/u.j.w.a.l._22?igsh=MTF2bjFhOHRkdTNhag==',
    github: ' https://github.com/ujwal-22'
  },
  {
    id: 9,
    name: 'Vivek Singh',
    role: 'Programmer Analyst',
    photo: Vivek,
    linkedin: 'www.linkedin.com/in/vivek-singh-290452257',
    instagram: 'https://www.instagram.com/__vivek__.__singh__/',
    github: ' https://github.com/vivek-singh-2001'
  }
])
</script>

<style scoped>
.img {
  height: 95%;
  width: 95%;
}

.user-container {
  padding: 5px;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-img {
  height: 100px;
  width: 100px;

  border-radius: 50%;
  filter: grayscale(60%);
  transition: all 0.3s ease;
}

.user-img:hover {
  filter: none;
  box-shadow: 0 0 0 4px #112d4e;
}

.social-icon-img {
  height: 36px;
  width: 36px;
  filter: grayscale(60%);
  transition: all 0.3s ease;
}

.social-icon-img:hover {
  filter: none;
  scale: 1.1;
  border: none;
}
.social-icon {
  margin-left: 25px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

p {
  font-family: 'Inter', sans-serif;
}
</style>
