import { graphql } from "gatsby"
import React from "react"
import { useContext } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { Box } from "grommet"
import { Grid } from "grommet"
import { Anchor } from "grommet"
import { ResponsiveContext } from "grommet"
import { Text } from "grommet"
import { Chat } from "grommet-icons"
import { Favorite } from "grommet-icons"

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2;
  opacity: 0;
  transition: all 0.3s ease 0s;
`
const Content = styled(Box)`
  z-index: 10;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`

const Info = styled(Box)`
  opacity: 0;
  transition: all 0.4s ease 0s;
`

const Wrapper = styled(Anchor)`
  position: relative;
  overflow: hidden;
  > div img {
    transition: all 0.3s ease 0s !important;
  }
  &:hover {
    ${Overlay} {
      opacity: 1;
    }
    ${Info} {
      opacity: 1;
    }
  }
`

const Node = ({ node }) => {
    return (
        <Wrapper plain href={`https://www.instagram.com/p/${node.id}/`}>
            <Overlay />
            <Img fluid={node.localFile.childImageSharp.fluid} />
            <Content justify="center">
                <Info gap="medium" alignSelf="center" direction="row">
                    <Favorite color="white" />
                    <Text color="white">{node.likes}</Text>
                    <Chat color="white" />
                    <Text color="white">{node.comments}</Text>
                </Info>
            </Content>
        </Wrapper>
    )

}


 const InstagramPosts = ({ data }) => {
    const size = useContext(ResponsiveContext)
    const allInstaNode = data.allInstaNode
    return (
        <Grid
            
            justifyContent="start"
            gap="none"
            columns={
                size === `small`
                    ? [`1fr`]
                    : size === `medium`
                        ? [`1fr`, `1fr`]
                        : `350px`
            }
        >
            {console.log(allInstaNode)}
            {allInstaNode.edges.map(instagram => (
                <Node key={instagram.node.id} node={instagram.node} />
            ))}
        </Grid>
    )
}

export default InstagramPosts

export const pageQuery = graphql`
  query ScrapingQuery {
    allInstaNode(filter: { username: { eq: "8556131572" } }) {
      edges {
        node {
          id
          username
          likes
          caption
          comments
          timestamp
          localFile {
            childImageSharp {
              fluid(quality: 70, maxWidth: 600, maxHeight: 600) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
