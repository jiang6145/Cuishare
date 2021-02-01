<template lang="pug">
  .member-management
    h3.d-inline-block.mb-4.mr-3 會員管理
    span.tag.no-hover {{ '會員人數：' + members.length}}
    b-form.mb-4
      b-form-input(
        v-model="searchValue"
        type="text"
        placeholder="搜尋用戶暱稱或輸入會員狀態來查詢 ..."
      )

    .member-management__main
      b-table(
        :fields="fields"
        :items="filterMembers"
        responsive
        striped
        hover
      )
        template(#cell(photoUrl)="data")
          b-avatar(
            :src="data.item.photoUrl"
            :to="'/blog/'+ data.item._id"
            size="3rem"
          )
        template(#cell(isBlocked)="data")
          b-button.custom-btn.custom-btn--blockade(
            variant="outline-success"
            size="sm"
            @click="blockade(data)"
            :class="data.item.isBlocked ? 'btn--blocked' :''"
          ) {{ data.item.isBlocked ? '封鎖中': '正常' }}
</template>

<script>
import { dateFormat } from '../../dateDifference'

export default {
  name: 'MemberManagement',
  data () {
    return {
      searchValue: '',
      fields: [
        { key: 'photoUrl', label: '' },
        { key: 'username', label: '用戶暱稱', sortable: true },
        { key: 'email', label: '帳號', sortable: true },
        { key: 'createDate', label: '註冊日期', sortable: true },
        { key: 'isBlocked', label: '會員狀態' }
      ],
      members: []
    }
  },
  computed: {
    filterMembers () {
      if (this.searchValue.startsWith('正常')) {
        return this.members.filter(member => !member.isBlocked)
      } else if (this.searchValue.startsWith('封鎖')) {
        return this.members.filter(member => member.isBlocked)
      } else {
        return this.members.filter(member => member.username.indexOf(this.searchValue) >= 0)
      }
    }
  },
  methods: {
    async blockade (data) {
      try {
        const blockadeData = {
          isBlocked: !data.item.isBlocked
        }

        const res = await this.axios.patch(process.env.VUE_APP_API + '/users/blockade/' + data.item._id, blockadeData)
        const { success, result } = res.data
        if (success) data.item.isBlocked = result.isBlocked
      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted () {
    try {
      const res = await this.axios.get(process.env.VUE_APP_API + '/users')
      const { success, result } = res.data

      if (success) {
        this.members = result.map(user => {
          user.createDate = dateFormat(user.createDate)
          return user
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
